import { describe, expect, it } from "bun:test"
import {
  departedDetail,
  renderRemovals,
  renderTightening,
  splitBySubject,
} from "./suppression-subject.ts"

const CARRIER_OF = (entry: string): string => entry.slice(0, entry.indexOf("#"))

function split(stale: readonly string[], live: readonly string[]) {
  return splitBySubject({ stale, carrierOf: CARRIER_OF, liveCarriers: new Set(live) })
}

describe("splitBySubject", () => {
  it("parts a departed carrier from a repaired defect, which one stale count cannot", () => {
    const verdict = split(["gone.md#a", "here.md#b"], ["here.md"])
    expect(verdict.departed).toEqual([{ entry: "gone.md#a", carrier: "gone.md" }])
    expect(verdict.repaired).toEqual(["here.md#b"])
  })

  it("calls an entry repaired only while its carrier is in the corpus", () => {
    const verdict = split(["here.md#b"], [])
    expect(verdict.departed).toEqual([{ entry: "here.md#b", carrier: "here.md" }])
    expect(verdict.repaired).toEqual([])
  })

  it("reports every entry departed when the corpus collapses, rather than reclassifying", () => {
    const verdict = split(["a.md#x", "b.md#y", "c.md#z"], [])
    expect(verdict.departed.map((d) => d.entry)).toEqual(["a.md#x", "b.md#y", "c.md#z"])
    expect(verdict.repaired).toEqual([])
  })

  it("partitions what it was given, so the two arms reconcile against the stale list", () => {
    const stale = ["gone.md#a", "here.md#b", "also-gone.md#c"]
    const verdict = split(stale, ["here.md"])
    expect([...verdict.departed.map((d) => d.entry), ...verdict.repaired].sort()).toEqual(
      [...stale].sort()
    )
  })

  it("carries no list of its own, so an empty stale list yields two empty arms", () => {
    expect(split([], ["here.md"])).toEqual({ departed: [], repaired: [] })
  })
})

describe("departedDetail", () => {
  it("names both the entry and the carrier, so a refusal is findable rather than merely true", () => {
    const detail = departedDetail({
      departed: { entry: "gone.md#fn", carrier: "gone.md" },
      carrierNoun: "markdown file",
    })
    expect(detail).toContain("gone.md#fn")
    expect(detail).toContain("markdown file")
  })
})

describe("renderTightening", () => {
  it("says nothing when no entry was repaired, so a clean run stays clean", () => {
    expect(renderTightening({ prefix: "[x]", repaired: [], defectNoun: "restatement" })).toBe("")
  })

  it("counts only what was repaired — a departed entry is refused, never offered as available", () => {
    const line = renderTightening({
      prefix: "[x]",
      repaired: ["a", "b"],
      defectNoun: "restatement",
    })
    expect(line).toContain("2")
    expect(line).toContain("restatement")
  })
})

describe("renderRemovals", () => {
  const NOUNS = { carrierNoun: "markdown file", defectNoun: "restatement" } as const

  it("renders two removals of the same size differently when their causes differ", () => {
    const departed = renderRemovals({ split: split(["a.md#x", "b.md#y"], []), ...NOUNS })
    const repaired = renderRemovals({
      split: split(["a.md#x", "b.md#y"], ["a.md", "b.md"]),
      ...NOUNS,
    })
    expect(departed).not.toBe(repaired)
  })

  it("states both causes even at zero, so a one-sided line cannot read as the whole account", () => {
    const line = renderRemovals({ split: split(["gone.md#a"], []), ...NOUNS })
    expect(line).toContain("markdown file")
    expect(line).toContain("restatement")
  })
})
