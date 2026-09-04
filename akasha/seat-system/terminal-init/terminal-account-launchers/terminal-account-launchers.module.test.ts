import { describe, expect, test } from "bun:test"
import { claudeNewAccountFn, supervisorFn } from "./terminal-account-launchers.module.code.ts"

async function parses(said: string): Promise<number> {
  const ran = Bun.spawn({ cmd: ["bash", "-n"], stdin: new TextEncoder().encode(said) })
  return await ran.exited
}

describe("a client opened on one account", () => {
  const said = supervisorFn("c1", " -a aawalton")

  test("stands under the launcher's own name", () => {
    expect(said.startsWith("_akasha_fn_c1() {")).toBe(true)
  })

  test("is reached through the pty proxy rather than run directly", () => {
    expect(said).toContain(
      'bun run "$_root/akasha/seat-system/pty-proxy/pty-proxy.module.code.ts" -- bun run'
    )
  })

  test("resets the terminal and ends with what the client ended with", () => {
    expect(said).toContain("local _rc=$?\n  tput reset\n  return $_rc")
  })

  test("parses", async () => {
    expect(await parses(said)).toBe(0)
  })
})

describe("a new account", () => {
  const said = claudeNewAccountFn("cna")

  test("is named and given an address before any client opens", () => {
    expect(said.indexOf("claude-account-add")).toBeLessThan(said.indexOf("Launching login session"))
  })

  test("named as nothing ends the launcher", () => {
    expect(said).toContain("cna: aborted — no account name")
    expect(said).toContain("cna: aborted — no email")
  })

  test("says its own alias stands only once the set is composed again", () => {
    expect(said).toContain("Run 's.' to load the new c-alias")
  })

  test("parses", async () => {
    expect(await parses(said)).toBe(0)
  })
})
