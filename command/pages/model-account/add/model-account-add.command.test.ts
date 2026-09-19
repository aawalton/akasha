import { expect, test } from "bun:test"
import { InputError } from "akasha/alan/harness/errors-core/modules/exit-code/exit-code.module.code.ts"
import { argument } from "akasha/command/argument/argument.page-type.ts"
import { email as emailArgument } from "akasha/command/argument/pages/email.argument.ts"
import {
  DATA,
  OPERATIONAL,
  refusedBy,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import { throwingAfter } from "akasha/command/modules/answering/command-answering.module.test-fixtures.ts"
import type { Given } from "akasha/command/modules/calling/calling.module.code.ts"
import {
  type Asked,
  addressFor,
  filedBy,
  modelAccountAdd,
  slotFrom,
  wrongIn,
} from "akasha/command/pages/model-account/add/model-account-add.command.code.ts"
import { modelAccountAdd as page } from "akasha/command/pages/model-account/add/model-account-add.command.ts"

const EMAIL_AT = `${argument.slug}/${emailArgument.slug}` as const

const ASKED: Asked = { account: "tempereso", email: "a@b.c", alias: null }

const HERE: Given = {
  root: "/nowhere",
  calledAs: "akasha model-account add",
  from: "/nowhere",
  writer: null,
  agentId: null,
}

const LANDED = "committed as 346ea7067fc"

const SWEPT = "moved the tree it landed onto"

test("an account named twice over is refused", async () => {
  const said = await modelAccountAdd(["one", "two", "--email", "a@b.c"], HERE)

  expect(said.refusals.join(" ")).toContain("takes 1 word and this call says 2 words")
})

test("an address the call does not say is the account's own name at alanwalton.com", () => {
  expect(addressFor("abby")).toBe("abby@alanwalton.com")
})

test("the call may leave the address out", () => {
  const asked = page.arguments.find((one) => one.argument === EMAIL_AT)
  expect(asked).toBeDefined()
  expect((asked as { required?: boolean }).required ?? false).toBe(false)
})

test("an alias slot below one is refused", () => {
  expect(wrongIn("tempereso", "a@b.c", 0)[0] ?? "").toContain("a whole number from one up")
})

test("a slot another account holds is refused rather than shared", () => {
  expect(slotFrom(new Map([["other", 3]]), 3)).toContain("held by")
})

test("a run that threw after the commit landed names that commit", async () => {
  const held = throwingAfter([LANDED], new Error("the tree would not move"))

  const said = await filedBy(ASKED, HERE, held)

  const refused = said.refusals.join(" ")
  expect(said.report).toEqual([LANDED])
  expect(refused).toContain("stopped part way")
  expect(refused).toContain(LANDED)
})

test("a refusal returned after the commit landed names that commit too", async () => {
  const said = await filedBy(ASKED, HERE, async (done) => {
    done.push(LANDED)
    return refusedBy(["the unit would not install"], DATA)
  })

  const refused = said.refusals.join(" ")
  expect(said.report).toEqual([LANDED])
  expect(refused).toContain("the unit would not install")
  expect(refused).toContain("stopped part way")
  expect(refused).toContain(LANDED)
  expect(said.code).toBe(DATA)
})

test("a run that threw before the commit landed says nothing of a commit", async () => {
  const held = throwingAfter([], new Error("the index would not open"))

  const said = await filedBy(ASKED, HERE, held)

  expect(said.report).toEqual([])
  expect(said.refusals.join(" ")).not.toContain("stopped part way")
})

test("a run that threw names each thing it did in the order it did them", async () => {
  const held = throwingAfter([LANDED, SWEPT], new Error("the answer would not compose"))

  const said = await filedBy(ASKED, HERE, held)

  const refused = said.refusals.join(" ")
  expect(refused.indexOf(LANDED)).toBeLessThan(refused.indexOf(SWEPT))
  expect(refused).toContain("thrown at")
})

test("a run that threw carries the kind that throw names rather than one spelled here", async () => {
  const thrown = new InputError("the address is no address")

  const said = await filedBy(ASKED, HERE, throwingAfter([LANDED], thrown))

  expect(said.code).toBe(1)
  expect(said.code).not.toBe(OPERATIONAL)
})
