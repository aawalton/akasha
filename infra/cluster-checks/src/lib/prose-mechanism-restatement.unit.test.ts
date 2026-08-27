import { describe, expect, test } from "bun:test"
import { applyRatchet, carriesProse, findRestatements, nextRatchet, PROSE_CARRIER_KINDS, restatementCarrier, restatementKey, UNLEXED_KINDS } from "../../../../../instructions/tools/lib/check-workflow/prose-mechanism-restatement"

const DOC = `
# A doc

The kernel is \`decideWakeMatch({ isDormant, isRetired, comms, wakeSources })\` and it is pure.

Optional members are marked: \`listFillerJobs({ status?, limit? })\`.

A call example carries values and is usage rather than a restatement:
\`getPages({ withCount: true })\` and \`armIdleGate({isMaintenance:true})\`.

An explicit elision claims nothing: \`buildConceptRecord({...})\`.

Naming the function without transcribing it is the shape we want: \`decideSeatWake\`.
`

const TS_SOURCE = [
  "/**",
  " * The reactor is `decideWakeMatch({ isDormant, isRetired })` and it is pure.",
  " */",
  "const example = `runSupervisor({ httpPort, hostName })`",
  "export const used = example",
].join("\n")

const found = (file: string, symbol: string) => ({
  file,
  symbol,
  fields: ["a"],
  line: 1,
  span: `\`${symbol}({ a })\``,
})

describe("findRestatements — what counts as prose restating a declared field set", () => {
  test("a bare-identifier span is a restatement, and its fields are recovered", () => {
    const hits = findRestatements("d.md", DOC)
    const wake = hits.find((h) => h.symbol === "decideWakeMatch")
    expect(wake?.fields).toEqual(["isDormant", "isRetired", "comms", "wakeSources"])
  })

  test("an optional marker is part of the transcription, and the bare name is kept", () => {
    const hits = findRestatements("d.md", DOC)
    expect(hits.find((h) => h.symbol === "listFillerJobs")?.fields).toEqual(["status", "limit"])
  })

  test("a call example carrying VALUES is usage, not a restatement — the field set is not being claimed", () => {
    const symbols = findRestatements("d.md", DOC).map((h) => h.symbol)
    expect(symbols).not.toContain("getPages")
    expect(symbols).not.toContain("armIdleGate")
  })

  test("an explicit elision restates nothing", () => {
    expect(findRestatements("d.md", DOC).map((h) => h.symbol)).not.toContain("buildConceptRecord")
  })

  test("naming a function without transcribing its fields is not a restatement — this is the shape a fix produces", () => {
    expect(findRestatements("d.md", DOC).map((h) => h.symbol)).not.toContain("decideSeatWake")
  })

  test("prose with no transcription at all yields none", () => {
    expect(findRestatements("d.md", "Just words, and a bare `symbolName` mention.")).toEqual([])
  })
})

describe("the carrier — prose is read wherever it is authored, and code is not prose", () => {
  test("a doc comment in a source file is read, which is where the corpus went", () => {
    const hits = findRestatements("src/reactor.ts", TS_SOURCE)
    expect(hits.map((h) => h.symbol)).toContain("decideWakeMatch")
  })

  test("the same shape in CODE is not a restatement — a string literal describes nothing", () => {
    const hits = findRestatements("src/reactor.ts", TS_SOURCE)
    expect(hits.map((h) => h.symbol)).not.toContain("runSupervisor")
  })

  test("blanking rather than stripping keeps the reported line true of the file", () => {
    const hits = findRestatements("src/reactor.ts", TS_SOURCE)
    expect(hits.find((h) => h.symbol === "decideWakeMatch")?.line).toBe(2)
  })

  test("a class with no comment lexer yields none, and stands in the list this check prints as unexamined", () => {
    expect(findRestatements("addon.lua", "-- `decideWakeMatch({ a, b })`")).toEqual([])
    expect(UNLEXED_KINDS).toContain("lua")
    expect(carriesProse("addon.lua")).toBe(false)
  })

  test("markdown and TypeScript are both carriers, so widening did not trade one for the other", () => {
    expect(PROSE_CARRIER_KINDS).toContain("md")
    expect(PROSE_CARRIER_KINDS).toContain("ts")
    expect(carriesProse("docs/a.md")).toBe(true)
    expect(carriesProse("src/a.tsx")).toBe(true)
  })

  test("a path of no class the graph names carries no prose this check can claim to have read", () => {
    expect(carriesProse("assets/logo.png")).toBe(false)
  })
})

describe("the ratchet — red on a RISE, cleared by DELETING the restatement", () => {
  const CORPUS = new Set(["a.md", "b.md"])

  test("a restatement already on the accepted list does not redden the gate", () => {
    const r = applyRatchet([found("a.md", "fn")], ["a.md#fn"], CORPUS)
    expect(r.failures).toEqual([])
    expect(r.grandfathered).toEqual(["a.md#fn"])
  })

  test("a restatement nobody accepted fails — this is the rise the ratchet exists to refuse", () => {
    const r = applyRatchet([found("a.md", "fn"), found("b.md", "other")], ["a.md#fn"], CORPUS)
    expect(r.failures).toHaveLength(1)
    expect(r.failures[0]?.symbol).toBe("other")
  })

  test("the SAME symbol restated in a DIFFERENT file is a separate entry, so a copy does not ride in free", () => {
    expect(applyRatchet([found("b.md", "fn")], ["a.md#fn"], CORPUS).failures).toHaveLength(1)
  })

  test("the key is file-and-symbol, so two spans of one symbol in one file collapse — a declared bound", () => {
    expect(restatementKey(found("a.md", "fn"))).toBe("a.md#fn")
  })

  test("the carrier of a key is the file the restatement was read out of", () => {
    const restatement = found("dir/a.md", "fn")
    expect(restatementCarrier(restatementKey(restatement))).toBe(restatement.file)
  })
})

describe("a departure is not a repair — the two ways an accepted entry stops standing", () => {
  const CORPUS = new Set(["a.md"])

  test("an entry whose carrier is still read and whose transcription is gone is a REPAIR", () => {
    const r = applyRatchet([], ["a.md#fn"], CORPUS)
    expect(r.repaired).toEqual(["a.md#fn"])
    expect(r.departed).toEqual([])
    expect(r.failures).toEqual([])
  })

  test("an entry whose carrier has left the corpus is a DEPARTURE, and nobody edited any prose", () => {
    const r = applyRatchet([], ["gone.md#fn"], CORPUS)
    expect(r.departed).toEqual(["gone.md#fn"])
    expect(r.repaired).toEqual([])
  })

  test("both at once stay apart, which is what a single count could not say", () => {
    const r = applyRatchet([], ["a.md#fn", "gone.md#x"], CORPUS)
    expect(r.repaired).toEqual(["a.md#fn"])
    expect(r.departed).toEqual(["gone.md#x"])
  })

  test("a key whose path carries a hash is split on the LAST one, so the file is recovered whole", () => {
    const r = applyRatchet([], ["dir#odd/a.md#fn"], new Set(["dir#odd/a.md"]))
    expect(r.repaired).toEqual(["dir#odd/a.md#fn"])
  })
})

describe("nextRatchet — shrink-only, so regenerate-and-commit is not a way out", () => {
  test("regenerating REFUSES to admit a restatement that is not already accepted", () => {
    expect(nextRatchet(["a.md#fn", "c.md#new"], ["a.md#fn"], [])).toEqual({
      kind: "refused",
      wouldAdd: ["c.md#new"],
    })
  })

  test("regenerating drops the entries the verdict named, which is how the list burns down", () => {
    expect(nextRatchet(["a.md#fn"], ["a.md#fn", "gone.md#x"], ["gone.md#x"])).toEqual({
      kind: "written",
      accepted: ["a.md#fn"],
    })
  })

  test("an entry the run could not read is NOT dropped — a failed read deletes nothing", () => {
    expect(nextRatchet(["a.md#fn"], ["a.md#fn", "unread.md#y"], [])).toEqual({
      kind: "written",
      accepted: ["a.md#fn", "unread.md#y"],
    })
  })
})
