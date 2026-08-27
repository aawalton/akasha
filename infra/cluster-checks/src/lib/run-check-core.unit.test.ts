import { describe, expect, test } from "bun:test"
import { classifyCheckRun, decideCheckExit } from "./run-check-core.ts"

const RESOLUTION_STDERR =
  "error: Cannot find module '@shared/graph-core' from " +
  "'<abs path to the check>'\n\nBun v1.3.14 (Linux x64)\n"

const MIDRUN_THROW_STDERR =
  "2 | throw new Error('boom')\n              ^\nerror: boom\n      at <check>:2:11\n\n" +
  "Bun v1.3.14 (Linux x64)\n"

const SYNTAX_ERROR_STDERR =
  "1 | const x = = 3\n              ^\nerror: Unexpected =\n    at <check>:1:11\n\n" +
  "Bun v1.3.14 (Linux x64)\n"

describe("classifyCheckRun", () => {
  test("exit 0 is clean whatever landed on stderr", () => {
    expect(classifyCheckRun({ exitCode: 0, stderr: "" })).toBe("clean")
    expect(classifyCheckRun({ exitCode: 0, stderr: "warning: something\n" })).toBe("clean")
  })

  test("an unresolvable import is a tool error, not violations", () => {
    expect(classifyCheckRun({ exitCode: 1, stderr: RESOLUTION_STDERR })).toBe("tool-error")
  })

  test("a check that ran and found violations stays violations", () => {
    expect(classifyCheckRun({ exitCode: 1, stderr: "" })).toBe("violations")
  })

  test("a check that declared its own tool error keeps that channel", () => {
    expect(classifyCheckRun({ exitCode: 2, stderr: "[check-x] could not read config\n" })).toBe(
      "tool-error"
    )
  })

  test("a signal death is a tool error — it has no exit code of its own", () => {
    expect(classifyCheckRun({ exitCode: null, stderr: "" })).toBe("tool-error")
  })

  test("a syntax error and a mid-run throw stay violations", () => {
    expect(classifyCheckRun({ exitCode: 1, stderr: SYNTAX_ERROR_STDERR })).toBe("violations")
    expect(classifyCheckRun({ exitCode: 1, stderr: MIDRUN_THROW_STDERR })).toBe("violations")
  })

  test("the diagnostic is matched at line start, not anywhere in the stream", () => {
    const forwarded = "[check-x] subprocess said: error: Cannot find module 'x' from 'y'\n"
    expect(classifyCheckRun({ exitCode: 1, stderr: forwarded })).toBe("violations")
  })
})

describe("decideCheckExit", () => {
  test("clean reports 0", () => {
    expect(decideCheckExit({ exitCode: 0, stderr: "" })).toBe(0)
  })

  test("an unresolvable import reports 2 — the tool-error channel", () => {
    expect(decideCheckExit({ exitCode: 1, stderr: RESOLUTION_STDERR })).toBe(2)
  })

  test("a genuine violation still reports 1", () => {
    expect(decideCheckExit({ exitCode: 1, stderr: "" })).toBe(1)
  })

  test("a violations exit the check chose itself is preserved verbatim", () => {
    expect(decideCheckExit({ exitCode: 3, stderr: "" })).toBe(3)
  })

  test("a signal death reports 2 rather than inventing a verdict", () => {
    expect(decideCheckExit({ exitCode: null, stderr: "" })).toBe(2)
  })
})
