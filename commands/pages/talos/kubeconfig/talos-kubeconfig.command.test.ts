import { expect, test } from "bun:test"
import { InputError } from "akasha/alan/harness/errors-core/exit-code/exit-code.module.code.ts"
import { OPERATIONAL } from "akasha/commands/modules/answering/command-answering.module.code.ts"
import { throwingAfter } from "akasha/commands/modules/answering/command-answering.module.test-fixtures.ts"
import type { Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import {
  fetchedBy,
  madeSaid,
  type Named,
} from "akasha/commands/pages/talos/kubeconfig/talos-kubeconfig.command.code.ts"

const ASKED: Named = { ip: "10.0.0.4", cluster: "main" }

const HERE: Given = {
  root: "/nowhere",
  calledAs: "akasha talos kubeconfig",
  from: "/nowhere",
  writer: null,
  agentId: null,
}

const FOLDER = "/home/one/.kube"

test("a folder made is named by the folder it made", () => {
  expect(madeSaid(FOLDER)).toContain(FOLDER)
})

test("a fetch that threw after making the folder names that folder", async () => {
  const held = throwingAfter([madeSaid(FOLDER)], new Error("talosctl exited 1"))

  const said = await fetchedBy(ASKED, HERE, held)

  const refused = said.refusals.join(" ")
  expect(said.report).toEqual([madeSaid(FOLDER)])
  expect(refused).toContain("stopped part way")
  expect(refused).toContain(FOLDER)
})

test("a fetch that threw before making anything says nothing of a folder", async () => {
  const held = throwingAfter([], new Error("talosctl is not on PATH"))

  const said = await fetchedBy(ASKED, HERE, held)

  expect(said.report).toEqual([])
  expect(said.refusals.join(" ")).not.toContain("stopped part way")
})

test("a fetch that threw names each thing it did in the order it did them", async () => {
  const second = "asked talosctl for the kubeconfig"
  const held = throwingAfter([madeSaid(FOLDER), second], new Error("talosctl exited 1"))

  const said = await fetchedBy(ASKED, HERE, held)

  const refused = said.refusals.join(" ")
  expect(refused.indexOf(FOLDER)).toBeLessThan(refused.indexOf(second))
  expect(refused).toContain("thrown at")
})

test("a fetch that threw carries the kind that throw names rather than one spelled here", async () => {
  const held = throwingAfter([madeSaid(FOLDER)], new InputError("the node is unnamed"))

  const said = await fetchedBy(ASKED, HERE, held)

  expect(said.code).toBe(1)
  expect(said.code).not.toBe(OPERATIONAL)
})
