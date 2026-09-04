import { describe, expect, test } from "bun:test"
import {
  ENDED_DIR,
  ENDED_FN,
  terminalEndedFnLines,
  terminalEndedTrapLines,
} from "./terminal-ended.module.code.ts"

const said = terminalEndedFnLines().join("\n")

const trapped = terminalEndedTrapLines().join("\n")

async function parses(text: string): Promise<number> {
  const ran = Bun.spawn({ cmd: ["bash", "-n"], stdin: new TextEncoder().encode(text) })
  return await ran.exited
}

describe("what is left", () => {
  test("names when the shell ended, what it ended with and where it stood", () => {
    for (const key of ["ended-at", "status", "signal", "pid", "ppid", "tty"]) {
      expect(said).toContain(`"${key}"`)
    }
  })

  test("stands beside the terminal's own page under the tree the reader looks in", () => {
    expect(said).toContain(`local _dir="$_root/${ENDED_DIR}"`)
    expect(said).toContain(".code-editor-terminal.ended.uncommitted.attachment.json")
  })

  test("tells one shell from a later shell of the same pid by when it started", () => {
    expect(said).toContain("_stat=$(</proc/$$/stat)")
    expect(said).toContain("/$$-$_start.")
  })

  test("names the signal where the status is above a hundred and twenty-eight", () => {
    expect(said).toContain('[ "$_status" -gt 128 ] && _signal=$(kill -l $((_status - 128))')
  })

  test("ends as the shell would have ended where nothing could be left", () => {
    expect(said).toContain('[ -d "$_dir" ] || return 0')
    expect(said).toContain("|| return 0")
    expect(said.trimEnd().endsWith("return 0\n}")).toBe(true)
  })

  test("parses", async () => {
    expect(await parses(said)).toBe(0)
  })
})

describe("the trap", () => {
  test("is set only on a terminal the editor opened", () => {
    expect(trapped).toContain('if [ -n "${VSCODE_SHELL_INTEGRATION:-}" ]; then')
  })

  test("records a hangup and then re-raises it", () => {
    expect(trapped).toContain(`trap '${ENDED_FN} 129; trap - HUP; kill -HUP $$' HUP`)
  })

  test("parses", async () => {
    expect(await parses(`${said}\n${trapped}`)).toBe(0)
  })
})
