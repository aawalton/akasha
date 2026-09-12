import { expect, test } from "bun:test"
import { InputError } from "akasha/alan/harness/errors-core/exit-code/exit-code.module.code.ts"
import { OPERATIONAL } from "akasha/commands/modules/answering/command-answering.module.code.ts"
import { throwingAfter } from "akasha/commands/modules/answering/command-answering.module.test-fixtures.ts"
import {
  generatedBy,
  type Named,
} from "akasha/commands/pages/talos/secret-gen/talos-secret-gen.command.code.ts"

const ASKED: Named = { cluster: "main", force: true }

const WROTE = "wrote the bundle, which is every node's PKI"

const MODED = "set the bundle to mode 0600"

test("a run that threw after the bundle was written over names that write", async () => {
  const held = throwingAfter([WROTE], new Error("chmod would not run"))

  const said = await generatedBy(ASKED, held)

  const refused = said.refusals.join(" ")
  expect(said.report).toEqual([WROTE])
  expect(refused).toContain("stopped part way")
  expect(refused).toContain("every node's PKI")
})

test("a run that threw before it wrote anything says nothing of a bundle", async () => {
  const held = throwingAfter([], new Error("talosctl is not on PATH"))

  const said = await generatedBy(ASKED, held)

  expect(said.report).toEqual([])
  expect(said.refusals.join(" ")).not.toContain("stopped part way")
})

test("a run that threw names each write in the order it finished them", async () => {
  const held = throwingAfter([WROTE, MODED], new Error("the scratch would not clear"))

  const said = await generatedBy(ASKED, held)

  const refused = said.refusals.join(" ")
  expect(refused.indexOf(WROTE)).toBeLessThan(refused.indexOf(MODED))
  expect(refused).toContain("thrown at")
})

test("a run that threw carries the kind that throw names rather than one spelled here", async () => {
  const thrown = new InputError("the cluster is unnamed")

  const said = await generatedBy(ASKED, throwingAfter([WROTE], thrown))

  expect(said.code).toBe(1)
  expect(said.code).not.toBe(OPERATIONAL)
})
