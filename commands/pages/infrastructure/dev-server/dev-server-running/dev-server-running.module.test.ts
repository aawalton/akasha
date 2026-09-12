import { expect, test } from "bun:test"
import { DataError } from "akasha/alan/harness/errors-core/exit-code/exit-code.module.code.ts"
import {
  DATA,
  OK,
  OPERATIONAL,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer } from "akasha/commands/modules/calling/calling.module.code.ts"
import {
  keeping,
  stoppedBy,
} from "akasha/commands/pages/infrastructure/dev-server/dev-server-running/dev-server-running.module.code.ts"

const DONE = ["left a dev server running at pid 4242 on port 3000"]

test("a fault with nothing written is answered as the fault alone", () => {
  const said = stoppedBy([], new DataError("no app is filed under that name"))
  expect(said.report).toEqual([])
  expect(said.refusals).toEqual(["no app is filed under that name"])
  expect(said.code).toBe(DATA)
})

test("a fault after a write names what was written", () => {
  const said = stoppedBy(DONE, new Error("the state folder would not open"))
  expect(said.report).toEqual(DONE)
  expect(said.refusals[0]).toBe("the state folder would not open")
  const last = said.refusals[said.refusals.length - 1] as string
  expect(last).toContain("stopped part way")
  expect(last).toContain("pid 4242 on port 3000")
  expect(said.code).toBe(OPERATIONAL)
})

const REFUSED: Answer = {
  report: ["auto-bootstrapped /w/.env.local (3 vars)"],
  refusals: ["the dev server exited straight away with code 1"],
  code: OPERATIONAL,
}

const WORKED: Answer = { report: ["pid=4242 port=3000"], refusals: [], code: OK }

test("a refusal after a write names what was written beside that refusal", () => {
  const said = keeping(DONE, REFUSED)
  expect(said.report).toEqual([...DONE, "auto-bootstrapped /w/.env.local (3 vars)"])
  expect(said.refusals[0]).toBe("the dev server exited straight away with code 1")
  expect(said.refusals[1]).toContain("stopped part way")
  expect(said.code).toBe(OPERATIONAL)
})

test("a refusal with nothing written is left as it was", () => {
  expect(keeping([], REFUSED)).toEqual(REFUSED)
})

test("an answer that refused nothing is left as it was", () => {
  expect(keeping(DONE, WORKED)).toEqual(WORKED)
})
