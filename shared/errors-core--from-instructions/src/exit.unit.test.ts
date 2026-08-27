import { describe, expect, test } from "bun:test"
import {
  CliError,
  DataError,
  EXIT,
  type ExitCode,
  exitCodeForThrowable,
  InputError,
  isCliError,
  OperationalError,
} from "./exit"

describe("EXIT constants", () => {
  test("canonical codes match Unix Philosophy", () => {
    expect(EXIT.OK).toBe(0)
    expect(EXIT.INPUT).toBe(1)
    expect(EXIT.DATA).toBe(2)
    expect(EXIT.OPERATIONAL).toBe(3)
  })

  test("ExitCode type is the union of values", () => {
    const ok: ExitCode = EXIT.OK
    const input: ExitCode = EXIT.INPUT
    const data: ExitCode = EXIT.DATA
    const op: ExitCode = EXIT.OPERATIONAL
    expect([ok, input, data, op]).toEqual([0, 1, 2, 3])
  })
})

describe("CliError hierarchy", () => {
  test("InputError carries EXIT.INPUT and is recognized by isCliError", () => {
    const err = new InputError("bad flag")
    expect(err).toBeInstanceOf(Error)
    expect(isCliError(err)).toBe(true)
    expect(err.code).toBe(EXIT.INPUT)
    expect(err.message).toBe("bad flag")
    expect(err.name).toBe("InputError")
  })

  test("DataError carries EXIT.DATA", () => {
    const err = new DataError("not found")
    expect(err).toBeInstanceOf(Error)
    expect(isCliError(err)).toBe(true)
    expect(err.code).toBe(EXIT.DATA)
    expect(err.name).toBe("DataError")
  })

  test("OperationalError carries EXIT.OPERATIONAL", () => {
    const err = new OperationalError("upstream down")
    expect(err).toBeInstanceOf(Error)
    expect(isCliError(err)).toBe(true)
    expect(err.code).toBe(EXIT.OPERATIONAL)
    expect(err.name).toBe("OperationalError")
  })

  test("CliError with custom code for documented deviations", () => {
    const err = new CliError("partial", 4)
    expect(isCliError(err)).toBe(true)
    expect(err.code).toBe(4)
    expect(err.name).toBe("CliError")
  })

  test("an unknown-flag payload rides on InputError and changes nothing else about it", () => {
    const err = new InputError("unknown flag: --author", {
      name: "--author",
      suggestion: undefined,
    })
    expect(err).toBeInstanceOf(InputError)
    expect(isCliError(err)).toBe(true)
    expect(err.code).toBe(EXIT.INPUT)
    expect(err.name).toBe("InputError")
    expect(err.unknownFlag).toEqual({ name: "--author", suggestion: undefined })
  })

  test("an InputError raised for anything else carries no unknown-flag payload", () => {
    expect(new InputError("--seq: required flag missing").unknownFlag).toBe(undefined)
  })

  test("isCliError rejects untagged errors and non-errors", () => {
    expect(isCliError(new Error("plain"))).toBe(false)
    expect(isCliError("string")).toBe(false)
    expect(isCliError(null)).toBe(false)
    expect(isCliError(undefined)).toBe(false)
  })
})

describe("exitCodeForThrowable", () => {
  test("an untagged throwable is UNCLASSIFIED, never a code that means something else", () => {
    for (const thrown of [new Error("plain"), "string", null, undefined, { code: 1 }]) {
      expect(exitCodeForThrowable(thrown)).toBe(EXIT.UNCLASSIFIED)
      expect(exitCodeForThrowable(thrown)).not.toBe(EXIT.INPUT)
      expect(exitCodeForThrowable(thrown)).not.toBe(EXIT.DATA)
      expect(exitCodeForThrowable(thrown)).not.toBe(EXIT.OPERATIONAL)
    }
  })

  test("a tagged error still carries its own code", () => {
    expect(exitCodeForThrowable(new InputError("bad flag"))).toBe(EXIT.INPUT)
    expect(exitCodeForThrowable(new DataError("not found"))).toBe(EXIT.DATA)
    expect(exitCodeForThrowable(new OperationalError("upstream down"))).toBe(EXIT.OPERATIONAL)
    expect(exitCodeForThrowable(new CliError("partial", 4))).toBe(4)
  })
})
