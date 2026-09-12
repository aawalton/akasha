import { expect, test } from "bun:test"
import { OPERATIONAL } from "akasha/commands/modules/answering/command-answering.module.code.ts"
import { throwingAfter } from "akasha/commands/modules/answering/command-answering.module.test-fixtures.ts"
import {
  exportedBy,
  healable,
} from "akasha/commands/pages/browser/test-storage-state/browser-test-storage-state.command.code.ts"

const ASKED = { url: "https://nowhere.test", output: "/nowhere/storage-state.json" }

const STOPPED = new Error("the browser would not close")

test("a password refused is healed only for the throwaway user", () => {
  const refusedCredentials = { code: "invalid_credentials" }
  expect(healable("throwaway@nowhere.test", refusedCredentials, "throwaway@nowhere.test")).toBe(
    true
  )
  expect(healable("alan@nowhere.test", refusedCredentials, "throwaway@nowhere.test")).toBe(false)
  expect(healable("throwaway@nowhere.test", null, "throwaway@nowhere.test")).toBe(false)
})

test("a run that wrote before it threw names what it had written", async () => {
  const wrote = "wrote the storage state to /nowhere/storage-state.json"
  const said = await exportedBy(ASKED, throwingAfter([wrote], STOPPED))

  expect(said.report).toEqual([wrote])
  expect(said.refusals.at(-1)).toBe(
    `this stopped part way. What it had done by then is this: ${wrote}. Nothing after that ran.`
  )
  expect(said.code).toBe(OPERATIONAL)
})

test("a run that threw before it wrote anything says the fault and where it was thrown", async () => {
  const said = await exportedBy(ASKED, throwingAfter([], STOPPED))

  expect(said.report).toEqual([])
  expect(said.refusals[0]).toContain("the browser would not close")
  expect(said.refusals.some((one) => one.startsWith("thrown at "))).toBe(true)
  expect(said.refusals.some((one) => one.startsWith("this stopped part way"))).toBe(false)
})

test("a run that changed more than one thing names each of them in turn", async () => {
  const wrote = [
    "the password throwaway@nowhere.test carries was refused, and it is the throwaway user, " +
      "so it was set to the one the environment states and tried once more",
    "signed in at https://nowhere.test/",
  ]
  const said = await exportedBy(ASKED, throwingAfter(wrote, STOPPED))

  expect(said.report).toEqual(wrote)
  expect(said.refusals.at(-1)).toBe(
    `this stopped part way. What it had done by then is this: ${wrote.join("; ")}. ` +
      "Nothing after that ran."
  )
})
