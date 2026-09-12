import { afterAll, expect, test } from "bun:test"
import { existsSync } from "node:fs"
import { join } from "node:path"
import { pathsOf } from "akasha/changes/modules/answer/change-answer.module.code.ts"
import { editsIn } from "akasha/changes/modules/edits-keeping/edits-keeping.module.code.ts"
import { DATA, OK } from "akasha/commands/modules/answering/command-answering.module.code.ts"
import { baseOf as headOf } from "akasha/commands/modules/landing-change-composing/landing-change-composing.module.code.ts"
import { CHOSEN } from "akasha/commands/pages/change/apply/change-apply.command.code.ts"
import { agentPathOf } from "akasha/domains/context/modules/warranting/warranting.module.code.ts"
import { REFUSES_CODE } from "akasha/testing-system/minting/minting.module.code.ts"
import { put } from "akasha/testing-system/putting/putting.module.code.ts"
import {
  AGENT,
  applied,
  checking,
  givenIn,
  landedFrom,
  PROPOSED,
  REFUSES_TAKING,
  repoWith,
  scratch,
  THREE_AT,
  wrote,
} from "akasha/testing-system/repo-seeding/repo-seeding.module.code.ts"

afterAll(scratch.sweep)

test("an apply lands rather than keeps", () => {
  expect(CHOSEN.drafts).toBe(false)
})

test("an apply bars the key that would keep the edits back", () => {
  expect(CHOSEN.barred).toEqual(["draft"])
})

test("an apply takes the key saying what the commit is for", () => {
  expect(CHOSEN.barred).not.toContain("message")
})

test("an apply names itself in the refusal a barred key draws", () => {
  expect(CHOSEN.said).toBe("apply")
})

const TWO_AT = "akasha/two.ts"

const COMMITTED = "committed\n"

const REFUSED = `${TWO_AT} — refused for the test`

const TAKING = `${TWO_AT} — a check judged this going away`

function keptIn(root: string): readonly string[] {
  const kept = editsIn(root, agentPathOf(root, AGENT) ?? "")
  return "why" in kept ? [kept.why] : kept.rows.flatMap(pathsOf)
}

test("a change that refuses lands nothing", async () => {
  const root = repoWith()
  checking(root, "refuses", REFUSES_CODE)
  const was = headOf(root)
  const said = await wrote(root, ["--message", "held"])
  expect(said.code).toBe(DATA)
  expect(said.refusals.join("\n")).toContain(REFUSED)
  expect(existsSync(join(root, TWO_AT))).toBe(false)
  expect(headOf(root)).toBe(was)
})

test("the checks judge the whole set of edits kept", async () => {
  const root = repoWith({ "akasha/one.ts": COMMITTED, [TWO_AT]: COMMITTED })
  checking(root, "refuses-taking", REFUSES_TAKING)
  const given = givenIn(root)
  expect((await landedFrom(["--remove", TWO_AT], given)).code).toBe(OK)
  const body = put(root, "body.txt", PROPOSED)
  const then = await landedFrom(["--file-path", THREE_AT, "--content-file", body], given)
  expect(then.report).toEqual([`adds ${THREE_AT}`])
  const said = await applied(root, then, ["--message", "held"], given)
  expect(said.code).toBe(DATA)
  expect(said.refusals.join("\n")).toContain(TAKING)
})

test("a check refusing leaves every edit kept where those edits are", async () => {
  const root = repoWith()
  checking(root, "refuses", REFUSES_CODE)
  const said = await wrote(root, ["--message", "held"])
  expect(said.code).toBe(DATA)
  expect(keptIn(root)).toEqual([TWO_AT])
})
