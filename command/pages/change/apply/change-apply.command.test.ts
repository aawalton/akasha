import { afterAll, expect, test } from "bun:test"
import { existsSync } from "node:fs"
import { join } from "node:path"
import { pathsOf } from "akasha/change/modules/answer/change-answer.module.code.ts"
import { editsIn } from "akasha/change/modules/edits-keeping/edits-keeping.module.code.ts"
import { REFUSES_CODE } from "akasha/check/test/fixture/minting/minting.test-fixture.code.ts"
import { put } from "akasha/check/test/fixture/putting/putting.test-fixture.code.ts"
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
} from "akasha/check/test/fixture/repo-seeding/repo-seeding.test-fixture.code.ts"
import { DATA, OK, told } from "akasha/command/modules/answering/command-answering.module.code.ts"
import { baseOf as headOf } from "akasha/command/modules/landing-change-composing/landing-change-composing.module.code.ts"
import {
  answered,
  changeApply,
  chosenFor,
} from "akasha/command/pages/change/apply/change-apply.command.code.ts"
import { agentPathOf } from "akasha/domain/context/modules/warranting/warranting.module.code.ts"

afterAll(scratch.sweep)

test("an apply lands rather than keeps", () => {
  expect(chosenFor(false).drafts).toBe(false)
})

test("a drafting apply keeps rather than lands", () => {
  expect(chosenFor(true).drafts).toBe(true)
})

test("an apply bars the key that would keep the edits back", () => {
  expect(chosenFor(false).barred).toEqual(["draft"])
})

test("an apply takes the key saying what the commit is for", () => {
  expect(chosenFor(false).barred).not.toContain("message")
})

test("a drafting apply bars the key saying what a commit is for", () => {
  expect(chosenFor(true).barred).toContain("message")
})

test("a drafting apply bars the key that would measure a landing it does not make", () => {
  expect(chosenFor(true).barred).toContain("measure")
})

test("an apply names itself in the refusal a barred key draws", () => {
  expect(chosenFor(false).said).toBe("apply")
})

test("a drafting apply names itself in the refusal a barred key draws", () => {
  expect(chosenFor(true).said).toBe("drafting apply")
})

test("a flag the command does not take is refused", async () => {
  const root = repoWith()
  const said = await changeApply(["remove-page", "--file-path", "akasha/one.ts"], givenIn(root))

  expect(said.refusals[0] ?? "").toContain("`--file-path` is no argument")
})

test("a drafting apply naming no change is refused rather than reaching every change", async () => {
  const root = repoWith()
  const said = await changeApply(["--draft"], givenIn(root))

  expect(said.refusals[0] ?? "").toContain("no change is named")
})

const OUTSIDE = {
  root: "/elsewhere",
  calledAs: "akasha change apply",
  from: "test",
  writer: null,
  agentId: null,
}

const AGENT_AT = "held.seat.ts"

const KEPT = "the edits are kept at held.jsonl, and `akasha change apply` lands them"

const COSTED = "what the run cost was recorded"

test("an apply that kept its edits before it threw names them in the refusal", async () => {
  const said = await answered(AGENT_AT, "remove-page", OUTSIDE, true, async (done) => {
    done.push(KEPT)
    throw new Error("the cost would not be recorded")
  })

  expect(said.report).toEqual([KEPT])
  expect(said.refusals.join(" ")).toContain("held.jsonl")
  expect(said.refusals.join(" ")).toContain("stopped part way")
})

test("an apply that threw before keeping anything says nothing of what it kept", async () => {
  const said = await answered(AGENT_AT, "remove-page", OUTSIDE, true, async () => {
    throw new Error("the change would not load")
  })

  expect(said.report).toEqual([])
  expect(said.refusals.join(" ")).not.toContain("stopped part way")
  expect(said.refusals[0] ?? "").toContain("would not load")
})

test("an apply names each thing it did in the order it did them", async () => {
  const said = await answered(AGENT_AT, "remove-page", OUTSIDE, true, async (done) => {
    done.push(KEPT)
    done.push(COSTED)
    throw new Error("the answer would not compose")
  })

  const refused = said.refusals.join(" ")
  expect(said.report).toEqual([KEPT, COSTED])
  expect(refused.indexOf(KEPT)).toBeLessThan(refused.indexOf(COSTED))
})

test("an apply that threw nothing is answered as that apply answered", async () => {
  const said = await answered(AGENT_AT, "remove-page", OUTSIDE, true, async () => told([KEPT]))

  expect(said.code).toBe(0)
  expect(said.report).toEqual([KEPT])
  expect(said.refusals).toEqual([])
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
