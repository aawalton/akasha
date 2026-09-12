import { expect, test } from "bun:test"
import {
  EXIT,
  exitCodeForThrowable,
  isCliError,
  OperationalError,
} from "akasha/alan/harness/errors-core/exit-code/exit-code.module.code.ts"

const FAILED = "ssh exited 65 (host: alan@macbook)"

test("an error carrying a run exits with the code it already had", () => {
  const thrown = new OperationalError(FAILED, { stdout: "", exit: 65 })
  expect(exitCodeForThrowable(thrown)).toBe(EXIT.OPERATIONAL)
  expect(thrown.code).toBe(EXIT.OPERATIONAL)
})

test("an error carrying a run is classified as it was before", () => {
  const thrown = new OperationalError(FAILED, { stdout: "", exit: 65 })
  expect(isCliError(thrown)).toBe(true)
  expect(thrown).toBeInstanceOf(OperationalError)
  expect(thrown.name).toBe("OperationalError")
})

test("the run carries what the host printed before it stopped", () => {
  const thrown = new OperationalError(FAILED, { stdout: "CHECKED_OUT\nSYNCED\n", exit: 65 })
  expect(thrown.ran?.stdout).toBe("CHECKED_OUT\nSYNCED\n")
  expect(thrown.ran?.exit).toBe(65)
  expect(thrown.message).toBe(FAILED)
})

test("an error raised by no run carries no run", () => {
  expect(new OperationalError("ssh not found on PATH").ran).toBeUndefined()
})

test("a run that printed nothing carries nothing rather than nothing known", () => {
  const thrown = new OperationalError(FAILED, { stdout: "", exit: 65 })
  expect(thrown.ran).toBeDefined()
  expect(thrown.ran?.stdout).toBe("")
})
