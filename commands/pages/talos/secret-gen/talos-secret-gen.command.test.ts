import { expect, test } from "bun:test"
import { InputError } from "akasha/alan/harness/errors-core/exit-code/exit-code.module.code.ts"
import { OPERATIONAL } from "akasha/commands/modules/answering/command-answering.module.code.ts"
import {
  type Generating,
  generatedBy,
  type Named,
  readIn,
} from "akasha/commands/pages/talos/secret-gen/talos-secret-gen.command.code.ts"

const ASKED: Named = { cluster: "main", force: true }

const WROTE = "wrote the bundle, which is every node's PKI"

const MODED = "set the bundle to mode 0600"

function generating(wrote: readonly string[], thrown: Error): Generating {
  return async (_read, done) => {
    for (const one of wrote) done.push(one)
    throw thrown
  }
}

test("a cluster nothing names is main", () => {
  const read = readIn([])
  if ("refused" in read) throw new Error("this was refused")
  expect(read.cluster).toBe("main")
})

test("a word where a flag goes is refused", () => {
  const read = readIn(["main"])
  if (!("refused" in read)) throw new Error("this was taken")
  expect(read.refused[0] ?? "").toContain("is no word this takes")
})

test("a run that threw after the bundle was written over names that write", async () => {
  const said = await generatedBy(ASKED, generating([WROTE], new Error("chmod would not run")))

  const refused = said.refusals.join(" ")
  expect(said.report).toEqual([WROTE])
  expect(refused).toContain("stopped part way")
  expect(refused).toContain("every node's PKI")
})

test("a run that threw before it wrote anything says nothing of a bundle", async () => {
  const said = await generatedBy(ASKED, generating([], new Error("talosctl is not on PATH")))

  expect(said.report).toEqual([])
  expect(said.refusals.join(" ")).not.toContain("stopped part way")
})

test("a run that threw names each write in the order it finished them", async () => {
  const said = await generatedBy(
    ASKED,
    generating([WROTE, MODED], new Error("the scratch would not clear"))
  )

  const refused = said.refusals.join(" ")
  expect(refused.indexOf(WROTE)).toBeLessThan(refused.indexOf(MODED))
  expect(refused).toContain("thrown at")
})

test("a run that threw carries the kind that throw names rather than one spelled here", async () => {
  const thrown = new InputError("the cluster is unnamed")

  const said = await generatedBy(ASKED, generating([WROTE], thrown))

  expect(said.code).toBe(1)
  expect(said.code).not.toBe(OPERATIONAL)
})
