import { afterAll, expect, test } from "bun:test"
import { join } from "node:path"
import { blobIdOf, recordRead, SUBAGENT_MARK } from "@akasha/command-system/reading"
import { scratchWorld } from "@akasha/command-system/scratching"
import { writing } from "@akasha/command-system/scratching/testing"
import { pageFiled } from "@akasha/indexes/testing"
import {
  agentPathOf,
  gatheredIn,
  NO_AGENT,
  owedIn,
  seatPathOf,
  subagentPathOf,
  unheldIn,
  unreadIn,
  warrantedIn,
  warrantsIn,
} from "./warranting.module.code.ts"
import {
  A,
  AGENT,
  B,
  chainOf,
  DECIDING,
  NOT_READ,
  OTHER,
  OWED,
  PATH,
  readAt,
  type Said,
  SEAT_AT,
  SEEDED_AT,
  SUB_AT,
  subaged,
  TERM_AT,
  warrantingStated,
  X,
  Y,
} from "./warranting.module.test-fixtures.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

const UNDER = `${AGENT}${SUBAGENT_MARK}suba`

function rootWith(every: readonly Said[] = [{ slug: "says-so" }]): string {
  const root = scratch.rootFor("akasha-warranting-")
  warrantingStated(root, every)
  return root
}

test("a path is asked what it warrants, and the warrants gathered say it", () => {
  const root = rootWith()
  const oid = writing(root, PATH, "one\n")
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
  writing(root, PATH, "one\n")
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
  writing(root, PATH, "one\n")
  const said = unreadIn(root, AGENT, [PATH])
  expect(said.length).toBe(1)
  expect(said[0]).toContain(NOT_READ)
})

test("a reading of the body standing now answers for it", () => {
  const root = rootWith()
  const oid = writing(root, PATH, "one\n")
  readAt(root, AGENT, PATH, oid)
  expect(unreadIn(root, AGENT, [PATH])).toEqual([])
})

test("a reading of another body is refused, and both ids are said", () => {
  const root = rootWith()
  const was = blobIdOf(new TextEncoder().encode("one\n"))
  const oid = writing(root, PATH, "two\n")
  readAt(root, AGENT, PATH, was)
  const said = unreadIn(root, AGENT, [PATH])
  expect(said.length).toBe(1)
  expect(said[0]).toContain("it has changed since")
  expect(said[0]).toContain(was)
  expect(said[0]).toContain(oid)
})

test("a body read only in part is owed as read in part", () => {
  const root = rootWith()
  const oid = writing(root, PATH, "one\n")
  readAt(root, AGENT, PATH, oid, null, 3)
  const said = unreadIn(root, AGENT, [PATH])
  expect(said.length).toBe(1)
  expect(said[0]).toContain("part of this reached you, and the rest has not")
  expect(said[0]).toContain("holds line 3 as how far")
  expect(said[0]).not.toContain("it has changed since")
  expect(said[0]).toContain(`akasha read --file-path ${PATH}`)
})

test("a reading whose mechanical id is the body standing now answers for it", () => {
  const root = rootWith()
  const was = blobIdOf(new TextEncoder().encode("one\n"))
  const oid = writing(root, PATH, "two\n")
  readAt(root, AGENT, PATH, was, oid)
  expect(unreadIn(root, AGENT, [PATH])).toEqual([])
})

test("when the body was read is not asked, only which body", () => {
  const root = rootWith()
  const oid = writing(root, PATH, "one\n")
  recordRead(root, AGENT, { path: PATH, oid, seenAt: 0, mechanicalOid: null })
  expect(unreadIn(root, AGENT, [PATH])).toEqual([])
})

test("one agent's reading answers for no other agent's write", () => {
  const root = rootWith()
  const oid = writing(root, PATH, "one\n")
  readAt(root, OTHER, PATH, oid)
  expect(unreadIn(root, AGENT, [PATH]).length).toBe(1)
})

test("a refusal says what the reading is owed for", () => {
  const root = rootWith()
  writing(root, PATH, "one\n")
  expect(unreadIn(root, AGENT, [PATH])[0]).toContain(OWED)
})

test("a refusal names the read that would answer the warrant", () => {
  const root = rootWith()
  writing(root, PATH, "one\n")
  expect(unreadIn(root, AGENT, [PATH])[0]).toContain(`akasha read --file-path ${PATH}`)
})

test("every path is answered for, not only the first", () => {
  const root = rootWith()
  const other = "akasha/thing/other.module.ts"
  writing(root, PATH, "one\n")
  writing(root, other, "two\n")
  expect(unreadIn(root, AGENT, [PATH, other]).length).toBe(2)
})

test("a path named twice is refused once", () => {
  const root = rootWith()
  writing(root, PATH, "one\n")
  expect(unreadIn(root, AGENT, [PATH, PATH]).length).toBe(1)
})

test("a path warranted by two warrants is judged once", () => {
  const root = rootWith([{ slug: "says-so" }, { slug: "says-so-again" }])
  writing(root, PATH, "one\n")
  expect(warrantsIn(root, PATH, "write").length).toBe(2)
  expect(unreadIn(root, AGENT, [PATH]).length).toBe(1)
})

test("a subagent's reading does not answer for its seat", () => {
  const root = rootWith()
  const oid = writing(root, PATH, "one\n")
  readAt(root, UNDER, PATH, oid)
  expect(unreadIn(root, UNDER, [PATH])).toEqual([])
  const said = unreadIn(root, AGENT, [PATH])
  expect(said.length).toBe(1)
  expect(said[0]).toContain(NOT_READ)
})

test("a seat's reading does not answer for a subagent acting under it", () => {
  const root = rootWith()
  const oid = writing(root, PATH, "one\n")
  readAt(root, AGENT, PATH, oid)
  expect(unreadIn(root, AGENT, [PATH])).toEqual([])
  const said = unreadIn(root, UNDER, [PATH])
  expect(said.length).toBe(1)
  expect(said[0]).toContain(NOT_READ)
})

test("one subagent's reading does not answer for another under the same seat", () => {
  const root = rootWith()
  const oid = writing(root, PATH, "one\n")
  readAt(root, UNDER, PATH, oid)
  const other = `${AGENT}${SUBAGENT_MARK}subb`
  expect(unreadIn(root, other, [PATH]).length).toBe(1)
})

test("a call charged to no agent is refused whole", () => {
  const root = rootWith()
  writing(root, PATH, "one\n")
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

test("the page a seat owes from is the one standing at its id", () => {
  const root = rootWith()
  pageFiled(root, AGENT, SEAT_AT)
  expect(seatPathOf(root, AGENT)).toBe(SEAT_AT)
})

test("a page standing at the id that is no seat is no seat", () => {
  const root = rootWith()
  pageFiled(root, AGENT, PATH)
  expect(seatPathOf(root, AGENT)).toBe(null)
})

test("an id standing at no page is no seat", () => {
  const root = rootWith()
  pageFiled(root, OTHER, SEAT_AT)
  expect(seatPathOf(root, AGENT)).toBe(null)
})

test("an agent standing at no page owes nothing of one", () => {
  const root = rootWith()
  pageFiled(root, OTHER, SEAT_AT)
  expect(unheldIn(root, AGENT)).toEqual([])
})

test("the page a subagent owes from stands at its seat's name and the id it runs under", () => {
  const root = rootWith()
  pageFiled(root, AGENT, SEAT_AT)
  subaged(root, "one-suba", SUB_AT)
  expect(subagentPathOf(root, UNDER)).toBe(SUB_AT)
  expect(agentPathOf(root, UNDER)).toBe(SUB_AT)
})

test("a subagent whose seat stands at no page stands at none", () => {
  const root = rootWith()
  subaged(root, "one-suba", SUB_AT)
  expect(subagentPathOf(root, UNDER)).toBe(null)
})

test("a subagent the index carries no page for stands at none", () => {
  const root = rootWith()
  pageFiled(root, AGENT, SEAT_AT)
  expect(subagentPathOf(root, UNDER)).toBe(null)
})

test("an id carrying no mark names no subagent", () => {
  const root = rootWith()
  pageFiled(root, AGENT, SEAT_AT)
  subaged(root, "one-suba", SUB_AT)
  expect(subagentPathOf(root, AGENT)).toBe(null)
})

test("a subagent owes what its own page names rather than what its seat's does", () => {
  const root = rootWith([{ slug: "chain", code: chainOf({ [SEAT_AT]: [X], [SUB_AT]: [Y] }) }])
  pageFiled(root, AGENT, SEAT_AT)
  subaged(root, "one-suba", SUB_AT)
  const said = unheldIn(root, UNDER)
  expect(said.length).toBe(1)
  expect(said[0]).toContain(Y)
})

test("a subagent standing at no page owes nothing", () => {
  const root = rootWith([{ slug: "chain", code: chainOf({ [SEAT_AT]: [X] }) }])
  pageFiled(root, AGENT, SEAT_AT)
  expect(unheldIn(root, UNDER)).toEqual([])
})

test("a seat owes what its page names", () => {
  const root = rootWith([{ slug: "chain", code: chainOf({ [SEAT_AT]: [X] }) }])
  pageFiled(root, AGENT, SEAT_AT)
  const said = unheldIn(root, AGENT)
  expect(said.length).toBe(1)
  expect(said[0]).toContain(X)
})

test("a seat owes what its page names rather than the page itself", () => {
  const root = rootWith()
  writing(root, SEAT_AT, "one\n")
  pageFiled(root, AGENT, SEAT_AT)
  expect(warrantsIn(root, SEAT_AT, "write").length).toBe(1)
  expect(unheldIn(root, AGENT)).toEqual([])
})

test("a reading of what a seat's page names answers for it", () => {
  const root = rootWith([{ slug: "chain", code: chainOf({ [SEAT_AT]: [X] }) }])
  pageFiled(root, AGENT, SEAT_AT)
  readAt(root, AGENT, X, "oid")
  expect(unheldIn(root, AGENT)).toEqual([])
})

test("one agent's reading does not answer for another agent's seat", () => {
  const root = rootWith([{ slug: "chain", code: chainOf({ [SEAT_AT]: [X] }) }])
  pageFiled(root, AGENT, SEAT_AT)
  readAt(root, OTHER, X, "oid")
  expect(unheldIn(root, AGENT).length).toBe(1)
})

test("a seat refusal says what the reading is owed for and names the read", () => {
  const root = rootWith([{ slug: "chain", code: chainOf({ [SEAT_AT]: [X] }) }])
  pageFiled(root, AGENT, SEAT_AT)
  expect(unheldIn(root, AGENT)[0]).toContain(`akasha read --file-path ${X}`)
})

test("a call charged to no agent owes nothing of a seat", () => {
  const root = rootWith([{ slug: "chain", code: chainOf({ [SEAT_AT]: [X] }) }])
  expect(unheldIn(root, null)).toEqual([])
})

test("a warrant owed of a taboo term is said before every warrant that is not", () => {
  const root = rootWith([{ slug: "chain", code: chainOf({ [A]: [X, TERM_AT, Y] }) }])
  expect(unreadIn(root, AGENT, [A]).map((one) => one.split("\n")[0])).toEqual([
    DECIDING,
    `${X}${NOT_READ}`,
    `${Y}${NOT_READ}`,
  ])
})

test("what is said of a taboo term names it rather than a reading to clear", () => {
  const root = rootWith([{ slug: "chain", code: chainOf({ [A]: [TERM_AT] }) }])
  const said = unreadIn(root, AGENT, [A])[0]
  expect(said?.split("\n")[1]).toBe(`${TERM_AT} states the term.`)
  expect(said).not.toContain(NOT_READ)
  expect(said).toContain(`akasha read --file-path ${TERM_AT}`)
  readAt(root, AGENT, TERM_AT, "gone")
  const moved = unreadIn(root, AGENT, [A])[0]
  expect(moved?.split("\n")[0]).toBe(DECIDING)
  expect(moved).toContain("it has changed since you read it")
})

test("what a change owes and what its seat owes are ordered as one answer", () => {
  const root = rootWith([{ slug: "chain", code: chainOf({ [SEAT_AT]: [X], [A]: [TERM_AT, Y] }) }])
  pageFiled(root, AGENT, SEAT_AT)
  expect(owedIn(root, AGENT, [A]).map((one) => one.split("\n")[0])).toEqual([
    DECIDING,
    `${X}${NOT_READ}`,
    `${Y}${NOT_READ}`,
  ])
})
