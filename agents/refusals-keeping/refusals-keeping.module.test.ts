import { afterAll, expect, test } from "bun:test"
import { readFileSync } from "node:fs"
import { join } from "node:path"
import {
  auditRefusalsAt,
  auditRefusalsPut,
  bodyOf,
  fits,
  pointedAt,
  pointerFor,
  refusalsAt,
  refusalsPut,
} from "akasha/agents/refusals-keeping/refusals-keeping.module.code.ts"
import { ANSWER_CEILING } from "akasha/commands/modules/long-body/long-body.module.code.ts"
import { scratchWorld } from "akasha/utils/fs/scratching/scratching.module.code.ts"
import { writing } from "akasha/utils/fs/scratching/scratching.module.test-fixtures.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

const PAGE = "one/amy.seat.ts"

const AT = "one/amy.seat.refusals.uncommitted.txt"

const AUDITED_AT = "one/amy.seat.audit-refusals.uncommitted.txt"

test("a seat's refusals are named beside that seat's page, outside the commit", () => {
  expect(refusalsAt("seat-system/seats/pages/amy.seat.ts")).toBe(
    "seat-system/seats/pages/amy.seat.refusals.uncommitted.txt"
  )
})

test("a subagent's refusals are named beside that subagent's page", () => {
  expect(refusalsAt("seat-system/subagents/pages/aine-a1.subagent.ts")).toBe(
    "seat-system/subagents/pages/aine-a1.subagent.refusals.uncommitted.txt"
  )
})

test("a path under no TypeScript name keeps no refusals", () => {
  expect(refusalsAt("elsewhere/notes.md")).toBeNull()
})

test("one blank line parts two refusals", () => {
  expect(bodyOf(["one refused", "two refused"])).toBe("one refused\n\ntwo refused\n")
})

test("the body written closes with a newline", () => {
  expect(bodyOf(["only this"])).toBe("only this\n")
})

test("a refusal set one answer holds fits", () => {
  expect(fits(["short enough to read where it was refused"])).toBe(true)
})

test("a refusal set past what one answer holds does not fit", () => {
  expect(fits(["a".repeat(ANSWER_CEILING)])).toBe(false)
})

test("the pointer names the path the refusals are written at", () => {
  expect(pointedAt("one/amy.seat.refusals.uncommitted.txt").join("\n")).toContain(
    "one/amy.seat.refusals.uncommitted.txt"
  )
})

test("the pointer names the call opening that path", () => {
  expect(pointedAt("one/amy.seat.refusals.uncommitted.txt").join("\n")).toContain(
    "akasha read --file-path"
  )
})

test("one wording names the path and the call, wherever the pointer is said", () => {
  expect(pointerFor(AT)).toContain(AT)
  expect(pointerFor(AT)).toContain(`akasha read --file-path ${AT}`)
  expect(pointedAt(AT)).toContain(pointerFor(AT))
})

test("refusals written whole hand back the path they were written at", () => {
  const root = scratch.rootFor("akasha-refusals-keeping-")
  writing(root, PAGE, "the page\n")
  expect(refusalsPut(root, PAGE, ["one refused", "two refused"])).toBe(AT)
  expect(readFileSync(join(root, AT), "utf8")).toBe("one refused\n\ntwo refused\n")
})

test("keeping no refusal takes the file away and hands back no path", () => {
  const root = scratch.rootFor("akasha-refusals-keeping-")
  writing(root, PAGE, "the page\n")
  writing(root, AT, "what refused before\n")
  expect(refusalsPut(root, PAGE, [])).toBeNull()
  expect(() => readFileSync(join(root, AT), "utf8")).toThrow()
})

test("a path under no TypeScript name is written nowhere and names nothing", () => {
  expect(refusalsPut("/elsewhere-nothing-reaches", "notes.md", ["one"])).toBeNull()
})

test("a file the machine could not write hands back no path", () => {
  expect(refusalsPut("/elsewhere-nothing-reaches", PAGE, ["one"])).toBeNull()
})

test("an audit's refusals are named beside the agent's page under a name of their own", () => {
  expect(auditRefusalsAt(PAGE)).toBe(AUDITED_AT)
  expect(auditRefusalsAt(PAGE)).not.toBe(refusalsAt(PAGE))
})

test("an audit's refusals are written whole and hand back the path they went to", () => {
  const root = scratch.rootFor("akasha-refusals-keeping-")
  writing(root, PAGE, "the page\n")
  expect(auditRefusalsPut(root, PAGE, ["one refused", "two refused"])).toBe(AUDITED_AT)
  expect(readFileSync(join(root, AUDITED_AT), "utf8")).toBe("one refused\n\ntwo refused\n")
})

test("a landing that refused nothing leaves what the audit wrote as it was", () => {
  const root = scratch.rootFor("akasha-refusals-keeping-")
  writing(root, PAGE, "the page\n")
  auditRefusalsPut(root, PAGE, ["what the audit found"])
  expect(refusalsPut(root, PAGE, [])).toBeNull()
  expect(readFileSync(join(root, AUDITED_AT), "utf8")).toBe("what the audit found\n")
})

test("an audit refusing nothing takes its own file away", () => {
  const root = scratch.rootFor("akasha-refusals-keeping-")
  writing(root, PAGE, "the page\n")
  auditRefusalsPut(root, PAGE, ["what the audit found"])
  expect(auditRefusalsPut(root, PAGE, [])).toBeNull()
  expect(() => readFileSync(join(root, AUDITED_AT), "utf8")).toThrow()
})

test("an audit refusing nothing leaves what a landing wrote as it was", () => {
  const root = scratch.rootFor("akasha-refusals-keeping-")
  writing(root, PAGE, "the page\n")
  refusalsPut(root, PAGE, ["what the landing refused"])
  expect(auditRefusalsPut(root, PAGE, [])).toBeNull()
  expect(readFileSync(join(root, AT), "utf8")).toBe("what the landing refused\n")
})
