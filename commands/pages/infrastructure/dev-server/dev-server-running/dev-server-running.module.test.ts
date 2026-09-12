import { expect, test } from "bun:test"
import { DataError } from "akasha/alan/harness/errors-core/exit-code/exit-code.module.code.ts"
import {
  DATA,
  OPERATIONAL,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import { stoppedBy } from "akasha/commands/pages/infrastructure/dev-server/dev-server-running/dev-server-running.module.code.ts"

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
