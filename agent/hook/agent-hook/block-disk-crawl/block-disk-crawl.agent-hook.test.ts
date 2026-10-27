import { expect, test } from "bun:test"
import { homedir } from "node:os"
import { join } from "node:path"
import {
  crawls,
  crawlsFrom,
  judgedFor,
  refusalFor,
  refusalIn,
  SCOPE,
} from "akasha/agent/hook/agent-hook/block-disk-crawl/block-disk-crawl.agent-hook.code.ts"
import { parseRefusal } from "akasha/agent/hook/modules/answer/hook-answer.module.code.ts"
import { payloadOf } from "akasha/agent/hook/test-fixtures/payload/hook-payload.test-fixture.code.ts"
import { ran } from "akasha/code/spawning/modules/running/running.module.code.ts"

const SCRIPT = join(import.meta.dir, "block-disk-crawl.agent-hook.code.ts")

const HOME = homedir()

test("the disk's roots and the home folder, however spelled, are read as roots", () => {
  for (const one of ["/", "/var", "/var/", "/var/home", "/home", HOME, `${HOME}/`, "~", "~/"]) {
    expect(crawlsFrom(one)).toBe(true)
  }
  for (const one of ["$HOME", "${HOME}", "$HOME/"]) expect(crawlsFrom(one)).toBe(true)
})

test("a narrower folder is no root", () => {
  for (const one of ["/var/tmp", "/var/tmp/x", `${HOME}/repos/other`, "~/repos", ".", "src"]) {
    expect(crawlsFrom(one)).toBe(false)
  }
})

test("a recursive search over a root is refused, whichever program runs it", () => {
  for (const one of [
    "find / -path '*gifted-reborn/turns*'",
    "find ~ -name x",
    "find -L /var -type f",
    "find $HOME -name x",
    `find ${HOME} -name x`,
    "rg -l needle /",
    "rg needle ~",
    "rg -g '*.ts' needle /var/home",
    "rg -e needle /",
    "fd x /",
    "grep -r needle /",
    "grep -Rn needle ~",
    "grep --recursive needle /var",
    "du -sh ~",
    "du /",
    "ls -R /",
    "ls -laR ~",
    "locate turns",
    "timeout 30 find / -name x",
  ]) {
    expect(refusalIn(one)).not.toBeNull()
  }
})

test("a scoped search, or one that is not recursive, is let through", () => {
  for (const one of [
    "find /var/tmp/x -name y",
    `find ${HOME}/repos/other -name y`,
    "find . -name y",
    "rg -l needle src",
    "rg -l / src",
    "rg needle",
    "grep needle /etc/hosts",
    "grep -r needle /var/tmp/x",
    "du -sh /var/tmp/x",
    "ls /",
    "ls -la ~",
    "ls -R src",
    "",
  ]) {
    expect(refusalIn(one)).toBeNull()
  }
})

test("one call is judged by its words, past any prefix that only runs it", () => {
  expect(crawls(["find", "/"])).toBe(true)
  expect(crawls(["find", "/var/tmp"])).toBe(false)
  expect(refusalFor("nice -n 10 find / -name x")).not.toBeNull()
  expect(refusalFor("echo find /")).toBeNull()
})

test("a crawl anywhere in a chain or a substitution refuses the whole call", () => {
  expect(refusalIn("ls && find / -name x")).not.toBeNull()
  expect(refusalIn("X=$(find / -name x)")).not.toBeNull()
  expect(refusalIn("bash -c 'rg needle /'")).not.toBeNull()
})

test("the refusal names the hook and every faster way", () => {
  const said = refusalIn("find / -name x") ?? ""
  expect(said).toContain("block-disk-crawl refused this call.")
  expect(said).toContain("akasha search")
  expect(said).toContain("the Glob tool")
  expect(said).toContain("the Grep tool")
  expect(said).toContain("the page the index points at")
})

test("the judgement this hook exports refuses and lets through as its rule does", () => {
  expect(
    parseRefusal(judgedFor({ tool_input: { command: "find / -name x" } }).out).reason
  ).toContain("block-disk-crawl refused this call.")
  expect(judgedFor({ tool_input: { command: "find /var/tmp/x" } }).out).toBe("")
})

test("the scope says what it refuses, where the rule comes from, and what it misses", () => {
  const said = SCOPE.join("\n")
  expect(said).toContain("WHERE THE RULE COMES FROM")
  expect(said).toContain("NOT REACHED")
  expect(said).toContain("is NOT a finding that it is safe")
})

test("the hook refuses on stdin with exit 2 and a blocking decision", () => {
  const done = ran(["bun", SCRIPT], { stdin: Buffer.from(payloadOf("find / -name x")) })
  expect(done.code).toBe(2)
  expect(parseRefusal(done.out).decision).toBe("block")
})

test("the hook lets a scoped search through on stdin", () => {
  const done = ran(["bun", SCRIPT], { stdin: Buffer.from(payloadOf("find /var/tmp/x")) })
  expect(done.code).toBe(0)
  expect(done.out).toBe("")
})
