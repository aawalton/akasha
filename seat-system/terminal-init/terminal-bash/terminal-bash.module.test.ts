import { describe, expect, test } from "bun:test"
import {
  type AliasEntry,
  functionNames,
  generateBashInit,
  inAliasOrder,
} from "./terminal-bash.module.code.ts"

const ACCOUNTS: readonly AliasEntry[] = [
  { account: "ctw", aliasIndex: 3 },
  { account: "aawalton", aliasIndex: 1 },
  { account: "aow", aliasIndex: 2 },
]

const said = generateBashInit(ACCOUNTS)

describe("the launchers", () => {
  test("stand in the order of the alias indexes rather than of the slugs", () => {
    expect(inAliasOrder(ACCOUNTS).map((one) => one.account)).toEqual(["aawalton", "aow", "ctw"])
    expect(said.indexOf("c1() {")).toBeLessThan(said.indexOf("c2() {"))
    expect(said.indexOf("c2() {")).toBeLessThan(said.indexOf("c3() {"))
  })

  test("are one per account, named for the alias index that account carries", () => {
    for (const { account, aliasIndex } of ACCOUNTS) {
      expect(said).toContain(`c${String(aliasIndex)}() {`)
      expect(said).toContain(`-a ${account}`)
    }
  })

  test("are named in the order the set defines them", () => {
    expect(functionNames(ACCOUNTS)).toEqual(["cu", "c1", "c2", "c3", "cna", "sn", "sr"])
  })

  test("each reload the whole set before dispatching", () => {
    for (const name of functionNames(ACCOUNTS)) {
      expect(said).toContain(`${name}() {\n  _akasha_reload\n  _akasha_fn_${name} "$@"\n}`)
    }
  })
})

describe("the set", () => {
  test("unaliases every name that was once an alias before defining it", () => {
    const at = said.indexOf("unalias ")
    expect(at).toBeGreaterThanOrEqual(0)
    for (const name of functionNames(ACCOUNTS)) {
      expect(said.slice(at, said.indexOf("\n", at))).toContain(name)
      expect(at).toBeLessThan(said.indexOf(`${name}() {`))
    }
  })

  test("carries the shell and git aliases a terminal is opened with", () => {
    expect(said).toContain("alias s.='source ~/.bashrc'")
    expect(said).toContain("alias gs='git status'")
  })

  test("pushes through the one command that pushes rather than through git", () => {
    expect(said).toContain("alias gp='akasha push'")
    expect(said).not.toContain("git push")
  })

  test("carries the seat launch step and the editor terminal trap", () => {
    expect(said).toContain("_akasha_tmux_launch() {")
    expect(said).toContain("_akasha_seat_live() {")
    expect(said).toContain("__editor_terminal_ended() {")
  })

  test("says above each block what the block is for", () => {
    for (const one of [
      "# the bounded reload every launcher runs before dispatching",
      "# cu - claude usage, read straight off the account pages",
      "# c<N> - reauth: claude on one account, in this terminal, seating nothing",
      "# sn - seat new: a fresh seat under tmux and this repo's supervisor, attached",
      "# sr - seat resume: reattach, or resume a seat under tmux, attached",
    ]) {
      expect(said).toContain(one)
    }
  })

  test("is bash a shell can parse", async () => {
    const ran = Bun.spawn({
      cmd: ["bash", "-n"],
      stdin: new TextEncoder().encode(said),
      stderr: "pipe",
    })
    expect(await new Response(ran.stderr).text()).toBe("")
    expect(await ran.exited).toBe(0)
  })

  test("composed for no account is still bash a shell can parse", async () => {
    const ran = Bun.spawn({
      cmd: ["bash", "-n"],
      stdin: new TextEncoder().encode(generateBashInit([])),
      stderr: "pipe",
    })
    expect(await ran.exited).toBe(0)
  })
})
