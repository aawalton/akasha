import { describe, expect, test } from "bun:test"
import {
  formatShellcheckViolation,
  readShellcheckRun,
  SHELLCHECK_ARGV,
  type ShellcheckViolation,
} from "./shellcheck-violations.ts"

const REAL_SC2164 = JSON.stringify({
  comments: [
    {
      file: "scripts/stress.sh",
      line: 43,
      endLine: 43,
      column: 5,
      endColumn: 21,
      level: "warning",
      code: 2164,
      message: "Use 'cd ... || exit' or 'cd ... || return' in case cd fails.",
      fix: { replacements: [] },
    },
  ],
})

const CLEAN = JSON.stringify({ comments: [] })

const read = (over: {
  exitCode?: number | null
  stdout?: string
  stderr?: string
}): readonly ShellcheckViolation[] =>
  readShellcheckRun({
    file: "scripts/stress.sh",
    exitCode: over.exitCode === undefined ? 1 : over.exitCode,
    stdout: over.stdout ?? REAL_SC2164,
    stderr: over.stderr ?? "",
  })

describe("SHELLCHECK_ARGV", () => {
  test("keeps `-x` and the SCRIPTDIR source path, which is what follows a sourced library", () => {
    expect(SHELLCHECK_ARGV).toContain("-x")
    expect(SHELLCHECK_ARGV).toContain("--source-path=SCRIPTDIR")
  })

  test("sets no severity floor, so the info-level classes #8954 turned on still report", () => {
    expect(SHELLCHECK_ARGV.some((arg) => arg.startsWith("--severity"))).toBe(false)
  })
})

describe("readShellcheckRun", () => {
  test("exit 1 with comments yields one violation per comment", () => {
    const violations = read({})
    expect(violations).toHaveLength(1)
    expect(violations[0]).toEqual({
      file: "scripts/stress.sh",
      line: 43,
      column: 5,
      code: 2164,
      level: "warning",
      message: "Use 'cd ... || exit' or 'cd ... || return' in case cd fails.",
    })
  })

  test("exit 0 with an empty comment list is a clean file, not a refusal", () => {
    expect(read({ exitCode: 0, stdout: CLEAN })).toEqual([])
  })

  test("the file is the member the walk is on, never the one the comment names", () => {
    const elsewhere = REAL_SC2164.replace("scripts/stress.sh", "somewhere/else.sh")
    expect(read({ stdout: elsewhere })[0]?.file).toBe("scripts/stress.sh")
  })

  const refusals: readonly { readonly what: string; readonly over: Parameters<typeof read>[0] }[] =
    [
      {
        what: "exit 2, the code for a file shellcheck could not process",
        over: { exitCode: 2, stdout: CLEAN, stderr: "nope.sh: openBinaryFile: does not exist" },
      },
      {
        what: "a death on a signal, with no exit code at all",
        over: { exitCode: null, stdout: "" },
      },
      { what: "an exit code shellcheck does not have today", over: { exitCode: 4, stdout: CLEAN } },
      { what: "output that is not JSON", over: { exitCode: 0, stdout: "In foo.sh line 1:\n" } },
      { what: "JSON with no `comments` key", over: { exitCode: 0, stdout: '{"other":[]}' } },
      { what: "`comments` that is not an array", over: { exitCode: 0, stdout: '{"comments":{}}' } },
      { what: "exit 1 for findings and no findings", over: { exitCode: 1, stdout: CLEAN } },
      { what: "exit 0 for clean and a finding anyway", over: { exitCode: 0, stdout: REAL_SC2164 } },
      {
        what: "a comment missing a field a violation needs",
        over: {
          stdout: JSON.stringify({ comments: [{ column: 5, code: 1, level: "x", message: "" }] }),
        },
      },
    ]

  for (const { what, over } of refusals) {
    test(`throws rather than reading clean: ${what}`, () => {
      expect(() => read(over)).toThrow()
    })
  }

  test("the refusal names the exit code, so a reader can tell which refusal it was", () => {
    expect(() => read({ exitCode: 2, stdout: CLEAN, stderr: "boom" })).toThrow(/2/)
  })
})

describe("formatShellcheckViolation", () => {
  test("carries the site, the rule code, the level, the message and the wiki url", () => {
    const line = formatShellcheckViolation({
      file: "scripts/stress.sh",
      line: 43,
      column: 5,
      code: 2164,
      level: "warning",
      message: "Use 'cd ... || exit' or 'cd ... || return' in case cd fails.",
    })
    expect(line).toContain("scripts/stress.sh:43:5")
    expect(line).toContain("SC2164 (warning)")
    expect(line).toContain("in case cd fails")
    expect(line).toContain("https://www.shellcheck.net/wiki/SC2164")
  })
})
