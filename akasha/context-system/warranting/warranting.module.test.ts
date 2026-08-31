import { afterAll, expect, test } from "bun:test"
import { mkdirSync } from "node:fs"
import { join } from "node:path"
import {
  blobIdOf,
  recordRead,
  SUBAGENT_MARK,
} from "../../command-system/reading/reading.module.code.ts"
import { scratchWorld } from "../../command-system/scratching/scratching.module.code.ts"
import { standing } from "../../command-system/scratching/scratching.module.test-fixtures.ts"
import { standingFiled } from "../../pages-system/indexes/index-reading/index-reading.module.test-fixtures.ts"
import { exportedAs } from "../../pages-system/page/page-export-name/page-export-name.module.code.ts"
import { mintedId } from "../../testing-system/minting/minting.module.code.ts"
import { indexed } from "../warrant-scratch/warrant-scratch.module.code.ts"
import {
  gatheredIn,
  NO_AGENT,
  seatPathOf,
  unheldIn,
  unreadIn,
  warrantedIn,
  warrantsIn,
} from "./warranting.module.code.ts"
import { SEEDED_AT } from "./warranting.module.test-fixtures.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

const CONTEXT_WARRANT = "context-warrant"

const AGENT = "01a04ee0-3078-7000-9069-e5db5da797ad"

const OTHER = "01a04ee0-3078-7000-9069-000000000000"

const UNDER = `${AGENT}${SUBAGENT_MARK}suba`

const PATH = "akasha/thing/thing.module.ts"

const OWED = "a reading this test says is owed"

const MODULE_AT = join(import.meta.dir, "warranting.module.code.ts")

type Said = {
  readonly slug: string
  readonly runsOnRead?: boolean
  readonly runsOnWrite?: boolean
  readonly transitive?: boolean
  readonly page?: string
  readonly code?: string
}

function pageFor(one: Said, id: string): string {
  return [
    `export const ${exportedAs(one.slug)} = {`,
    `  id: "${id}",`,
    `  pageTypeSlug: "context-warrant",`,
    `  slug: "${one.slug}",`,
    `  code: "ts",`,
    `  test: "ts",`,
    `  runsOnRead: ${one.runsOnRead ?? true},`,
    `  runsOnWrite: ${one.runsOnWrite ?? true},`,
    `  transitive: ${one.transitive ?? false},`,
    `}`,
    "",
  ].join("\n")
}

function chainOf(said: Record<string, readonly string[]>): string {
  return [
    "export function chain(root, path) {",
    `  const said = ${JSON.stringify(said)}`,
    '  return (said[path] ?? []).map((one) => ({ path: one, oid: "oid", owed: "owed" }))',
    "}",
    "",
  ].join("\n")
}

function codeFor(one: Said): string {
  return [
    `import { standingOf } from ${JSON.stringify(MODULE_AT)}`,
    "",
    `export function ${exportedAs(one.slug)}(root, path) {`,
    "  const oid = standingOf(root, path)",
    `  return oid === null ? [] : [{ path, oid, owed: ${JSON.stringify(OWED)} }]`,
    "}",
    "",
  ].join("\n")
}

function warranting(root: string, every: readonly Said[]): undefined {
  mkdirSync(join(root, SEEDED_AT), { recursive: true })
  for (const one of every) {
    const id = mintedId(one.slug)
    const at = join(SEEDED_AT, `${one.slug}.context-warrant.ts`)
    standing(root, at, one.page ?? pageFor(one, id))
    standing(root, `${at.slice(0, -".ts".length)}.code.ts`, one.code ?? codeFor(one))
    standingFiled(root, CONTEXT_WARRANT, one.slug, [{ path: at, id }])
  }
}

function rootWith(every: readonly Said[] = [{ slug: "says-so" }]): string {
  const root = scratch.rootFor("akasha-warranting-")
  warranting(root, every)
  return root
}

test("a path is asked what it warrants, and the warrants gathered say it", () => {
  const root = rootWith()
  const oid = standing(root, PATH, "one\n")
  expect(warrantsIn(root, PATH, "write")).toEqual([{ path: PATH, oid, owed: OWED }])
})

test("a warrant gathered says its slug, its page and the flags it stated", () => {
  const root = rootWith([{ slug: "says-so", runsOnRead: false }])
  expect(gatheredIn(root)).toEqual([
    {
      slug: "says-so",
      page: join(SEEDED_AT, "says-so.context-warrant.ts"),
      runsOnRead: false,
      runsOnWrite: true,
      transitive: false,
      warranting: expect.any(Function),
    },
  ])
})

test("a warrant that does not run on write is not run by a write", () => {
  const root = rootWith([{ slug: "says-so", runsOnWrite: false }])
  standing(root, PATH, "one\n")
  expect(warrantsIn(root, PATH, "write")).toEqual([])
  expect(unreadIn(root, AGENT, [PATH])).toEqual([])
  expect(warrantsIn(root, PATH, "read").length).toBe(1)
})

test("a warrant that answers to nothing that can be run is gathered by nobody", () => {
  const root = rootWith([{ slug: "says-so", code: "export const saysSo = 1\n" }])
  expect(() => gatheredIn(root)).toThrow("answers to nothing that can be run")
})

test("a warrant page stating no rule is gathered by nobody", () => {
  const root = rootWith([{ slug: "says-so", page: 'export const saysSo = { slug: "says-so" }\n' }])
  expect(() => gatheredIn(root)).toThrow("states no rule a runner can honour")
})

test("a warrant page answering to no export is gathered by nobody", () => {
  const root = rootWith([{ slug: "says-so", page: "export const held = 1\n" }])
  expect(() => gatheredIn(root)).toThrow("answers to no `saysSo`")
})

test("a path warranting nothing is asked and passes", () => {
  const root = rootWith()
  expect(unreadIn(root, AGENT, ["akasha/thing/new.module.ts"])).toEqual([])
})

test("a path the record holds no reading of is refused", () => {
  const root = rootWith()
  standing(root, PATH, "one\n")
  const said = unreadIn(root, AGENT, [PATH])
  expect(said.length).toBe(1)
  expect(said[0]).toContain("the record does not show you read this")
})

test("a reading of the body standing now answers for it", () => {
  const root = rootWith()
  const oid = standing(root, PATH, "one\n")
  recordRead(root, AGENT, { path: PATH, oid, seenAt: 1, mechanicalOid: null })
  expect(unreadIn(root, AGENT, [PATH])).toEqual([])
})

test("a reading of another body is refused, and both ids are said", () => {
  const root = rootWith()
  const was = blobIdOf(new TextEncoder().encode("one\n"))
  const oid = standing(root, PATH, "two\n")
  recordRead(root, AGENT, { path: PATH, oid: was, seenAt: 1, mechanicalOid: null })
  const said = unreadIn(root, AGENT, [PATH])
  expect(said.length).toBe(1)
  expect(said[0]).toContain("it has changed since")
  expect(said[0]).toContain(was)
  expect(said[0]).toContain(oid)
})

test("a reading whose mechanical id is the body standing now answers for it", () => {
  const root = rootWith()
  const was = blobIdOf(new TextEncoder().encode("one\n"))
  const oid = standing(root, PATH, "two\n")
  recordRead(root, AGENT, { path: PATH, oid: was, seenAt: 1, mechanicalOid: oid })
  expect(unreadIn(root, AGENT, [PATH])).toEqual([])
})

test("when the body was read is not asked, only which body", () => {
  const root = rootWith()
  const oid = standing(root, PATH, "one\n")
  recordRead(root, AGENT, { path: PATH, oid, seenAt: 0, mechanicalOid: null })
  expect(unreadIn(root, AGENT, [PATH])).toEqual([])
})

test("one agent's reading answers for no other agent's write", () => {
  const root = rootWith()
  const oid = standing(root, PATH, "one\n")
  recordRead(root, OTHER, { path: PATH, oid, seenAt: 1, mechanicalOid: null })
  expect(unreadIn(root, AGENT, [PATH]).length).toBe(1)
})

test("a refusal says what the reading is owed for", () => {
  const root = rootWith()
  standing(root, PATH, "one\n")
  expect(unreadIn(root, AGENT, [PATH])[0]).toContain(OWED)
})

test("a refusal names the read that would answer the warrant", () => {
  const root = rootWith()
  standing(root, PATH, "one\n")
  expect(unreadIn(root, AGENT, [PATH])[0]).toContain(`akasha read --file-path ${PATH}`)
})

test("every path is answered for, not only the first", () => {
  const root = rootWith()
  const other = "akasha/thing/other.module.ts"
  standing(root, PATH, "one\n")
  standing(root, other, "two\n")
  expect(unreadIn(root, AGENT, [PATH, other]).length).toBe(2)
})

test("a path named twice is refused once", () => {
  const root = rootWith()
  standing(root, PATH, "one\n")
  expect(unreadIn(root, AGENT, [PATH, PATH]).length).toBe(1)
})

test("a path warranted by two warrants is judged once", () => {
  const root = rootWith([{ slug: "says-so" }, { slug: "says-so-again" }])
  standing(root, PATH, "one\n")
  expect(warrantsIn(root, PATH, "write").length).toBe(2)
  expect(unreadIn(root, AGENT, [PATH]).length).toBe(1)
})

test("a subagent's reading does not answer for its seat", () => {
  const root = rootWith()
  const oid = standing(root, PATH, "one\n")
  recordRead(root, UNDER, { path: PATH, oid, seenAt: 1, mechanicalOid: null })
  expect(unreadIn(root, UNDER, [PATH])).toEqual([])
  const said = unreadIn(root, AGENT, [PATH])
  expect(said.length).toBe(1)
  expect(said[0]).toContain("the record does not show you read this")
})

test("a seat's reading does not answer for a subagent acting under it", () => {
  const root = rootWith()
  const oid = standing(root, PATH, "one\n")
  recordRead(root, AGENT, { path: PATH, oid, seenAt: 1, mechanicalOid: null })
  expect(unreadIn(root, AGENT, [PATH])).toEqual([])
  const said = unreadIn(root, UNDER, [PATH])
  expect(said.length).toBe(1)
  expect(said[0]).toContain("the record does not show you read this")
})

test("one subagent's reading does not answer for another under the same seat", () => {
  const root = rootWith()
  const oid = standing(root, PATH, "one\n")
  recordRead(root, UNDER, { path: PATH, oid, seenAt: 1, mechanicalOid: null })
  const other = `${AGENT}${SUBAGENT_MARK}subb`
  expect(unreadIn(root, other, [PATH]).length).toBe(1)
})

test("a call charged to no agent is refused whole", () => {
  const root = rootWith()
  standing(root, PATH, "one\n")
  expect(unreadIn(root, null, [PATH])).toEqual([NO_AGENT])
})

test("a call charged to no agent is refused even where nothing stands", () => {
  const root = rootWith()
  expect(unreadIn(root, null, ["akasha/thing/new.module.ts"])).toEqual([NO_AGENT])
})

test("no agent is told as something that should not be possible", () => {
  expect(NO_AGENT).toContain("should not be possible")
  expect(NO_AGENT).toContain("`AGENT_ID`")
})

const A = "akasha/one/a.ts"

const B = "akasha/one/b.ts"

const X = "akasha/one/x.ts"

const Y = "akasha/one/y.ts"

test("a read is handed the paths it names and what a warrant names for them", () => {
  const root = rootWith([{ slug: "chain", code: chainOf({ [A]: [X] }) }])
  expect(warrantedIn(root, [A])).toEqual([A, X])
})

test("a file a warrant names comes back after the file that warranted it", () => {
  const root = rootWith([{ slug: "chain", code: chainOf({ [A]: [X], [B]: [X, Y] }) }])
  expect(warrantedIn(root, [A, B])).toEqual([A, X, B, Y])
})

test("a file named and warranted both comes back once", () => {
  const root = rootWith([{ slug: "chain", code: chainOf({ [A]: [X] }) }])
  expect(warrantedIn(root, [A, X])).toEqual([A, X])
})

test("a file named twice comes back once", () => {
  const root = rootWith([{ slug: "chain", code: chainOf({}) }])
  expect(warrantedIn(root, [A, A])).toEqual([A])
})

test("what a transitive warrant names is asked what that warrant warrants in turn", () => {
  const root = rootWith([
    { slug: "chain", transitive: true, code: chainOf({ [A]: [X], [X]: [Y] }) },
  ])
  expect(warrantedIn(root, [A])).toEqual([A, X, Y])
})

test("what a warrant that is not transitive names is asked nothing in turn", () => {
  const root = rootWith([{ slug: "chain", code: chainOf({ [A]: [X], [X]: [Y] }) }])
  expect(warrantedIn(root, [A])).toEqual([A, X])
})

test("a transitive warrant naming its way back is walked once", () => {
  const root = rootWith([
    { slug: "chain", transitive: true, code: chainOf({ [A]: [X], [X]: [A] }) },
  ])
  expect(warrantedIn(root, [A])).toEqual([A, X])
})

test("a warrant that does not run on read hands a read nothing", () => {
  const root = rootWith([{ slug: "chain", runsOnRead: false, code: chainOf({ [A]: [X] }) }])
  expect(warrantedIn(root, [A])).toEqual([A])
})

test("a root the warrants cannot be gathered from hands back the paths handed in", () => {
  const root = rootWith([{ slug: "chain", page: 'export const chain = { slug: "chain" }\n' }])
  expect(() => gatheredIn(root)).toThrow()
  expect(warrantedIn(root, [A, B])).toEqual([A, B])
})

test("a root carrying no warrant hands back the paths handed in", () => {
  const root = scratch.rootFor("akasha-warranting-")
  expect(warrantedIn(root, [A, B])).toEqual([A, B])
})

const SEAT_AT = "akasha/seat-system/seat/seats/one.seat.ts"

function seated(root: string, id: string, path: string): undefined {
  indexed(root, `identity/page/id/${id}.jsonl`, JSON.stringify({ path, id }))
}

test("the page a seat owes from is the one standing at its id", () => {
  const root = rootWith()
  seated(root, AGENT, SEAT_AT)
  expect(seatPathOf(root, AGENT)).toBe(SEAT_AT)
})

test("a page standing at the id that is no seat is no seat", () => {
  const root = rootWith()
  seated(root, AGENT, PATH)
  expect(seatPathOf(root, AGENT)).toBe(null)
})

test("an id standing at no page is no seat", () => {
  const root = rootWith()
  expect(seatPathOf(root, AGENT)).toBe(null)
})

test("an agent sitting at no seat owes nothing of one", () => {
  const root = rootWith()
  expect(unheldIn(root, AGENT)).toEqual([])
})

test("a seat owes what its page names", () => {
  const root = rootWith([{ slug: "chain", code: chainOf({ [SEAT_AT]: [X] }) }])
  seated(root, AGENT, SEAT_AT)
  const said = unheldIn(root, AGENT)
  expect(said.length).toBe(1)
  expect(said[0]).toContain(X)
})

test("a seat owes what its page names rather than the page itself", () => {
  const root = rootWith()
  standing(root, SEAT_AT, "one\n")
  seated(root, AGENT, SEAT_AT)
  expect(warrantsIn(root, SEAT_AT, "write").length).toBe(1)
  expect(unheldIn(root, AGENT)).toEqual([])
})

test("a reading of what a seat's page names answers for it", () => {
  const root = rootWith([{ slug: "chain", code: chainOf({ [SEAT_AT]: [X] }) }])
  seated(root, AGENT, SEAT_AT)
  recordRead(root, AGENT, { path: X, oid: "oid", seenAt: 1, mechanicalOid: null })
  expect(unheldIn(root, AGENT)).toEqual([])
})

test("one agent's reading does not answer for another agent's seat", () => {
  const root = rootWith([{ slug: "chain", code: chainOf({ [SEAT_AT]: [X] }) }])
  seated(root, AGENT, SEAT_AT)
  recordRead(root, OTHER, { path: X, oid: "oid", seenAt: 1, mechanicalOid: null })
  expect(unheldIn(root, AGENT).length).toBe(1)
})

test("a seat refusal says what the reading is owed for and names the read", () => {
  const root = rootWith([{ slug: "chain", code: chainOf({ [SEAT_AT]: [X] }) }])
  seated(root, AGENT, SEAT_AT)
  expect(unheldIn(root, AGENT)[0]).toContain(`akasha read --file-path ${X}`)
})

test("a call charged to no agent owes nothing of a seat", () => {
  const root = rootWith([{ slug: "chain", code: chainOf({ [SEAT_AT]: [X] }) }])
  expect(unheldIn(root, null)).toEqual([])
})
