import { expect, test } from "bun:test"
import { join } from "node:path"
import {
  judgedFor,
  refusalFor,
  refusalIn,
  SCOPE,
  searchesHistory,
} from "akasha/agent/hook/agent-hook/block-history-search/block-history-search.agent-hook.code.ts"
import { parseRefusal } from "akasha/agent/hook/modules/answer/hook-answer.module.code.ts"
import { gitCallIn } from "akasha/agent/hook/modules/git-calls/git-calls.module.code.ts"
import { payloadOf } from "akasha/agent/hook/test-fixtures/payload/hook-payload.test-fixture.code.ts"
import { ran } from "akasha/code/spawning/modules/running/running.module.code.ts"

const SCRIPT = join(import.meta.dir, "block-history-search.agent-hook.code.ts")

test("the judgement this hook exports refuses what its rule refuses", () => {
  const said = judgedFor({ tool_input: { command: "git log -S one" } })

  expect(parseRefusal(said.out).reason).toContain("block-history-search refused this call.")
})

test("the judgement this hook exports leaves a call its rule lets through alone", () => {
  const said = judgedFor({ tool_input: { command: "git log --oneline" } })

  expect(said.out).toBe("")
  expect(said.err).toBe("")
})

function searching(command: string): boolean {
  const call = gitCallIn(command)
  return call !== null && searchesHistory(call)
}

test("a search of history for a change to some text is read as one", () => {
  for (const one of [
    "git log -S foo",
    "git log -Sfoo",
    "git log --pickaxe-regex -S foo",
    "git rev-list -G bar --all",
  ]) {
    expect(searching(one)).toBe(true)
  }
})

test("a call that is not such a search is not read as one", () => {
  for (const one of ["git log --oneline", "git log --grep=foo", "git grep -S", "git diff -S foo"]) {
    expect(searching(one)).toBe(false)
  }
})

test("refusalFor judges one call, and reads no other word on the line", () => {
  expect(refusalFor({ act: "log", before: [], rest: ["-S", "foo"] })).not.toBeNull()
  expect(refusalFor({ act: "log", before: [], rest: ["--oneline"] })).toBeNull()
  expect(refusalFor({ act: "log", before: [], rest: ["--grep=foo"] })).toBeNull()
})

test("the refusal names the hook, what it measured, and what answers instead", () => {
  const said = refusalIn("git log -S gitCallsIn --all") ?? ""
  expect(said).toContain("block-history-search refused this call.")
  expect(said).toContain("54.9 seconds of processor")
  expect(said).toContain("rg -l '<the symbol>' .")
  expect(said).toContain("no akasha command answers it today and none is planned")
})

test("an ordinary command is let through", () => {
  for (const one of [
    "git status",
    "git log --oneline -5",
    "git log --grep=one",
    "git grep -n one",
    "rg -l one .",
    "ls",
    "",
  ]) {
    expect(refusalIn(one)).toBeNull()
  }
})

test("a prefix that only runs the call does not hide such a search", () => {
  expect(refusalIn("timeout 900 git log -S one")).not.toBeNull()
  expect(refusalIn("nice -n 10 git rev-list -G one")).not.toBeNull()
})

test("a prefix this does not name hides the call behind it", () => {
  expect(refusalIn("timeout 900 echo git log -S one")).toBeNull()
})

test("a search kept out of the command word is read as the search it is", () => {
  for (const one of [
    "$(git log -S one)",
    "H=$(git log -S one)",
    "(git log -S one)",
    "bash -c 'git log -S one'",
  ]) {
    expect(refusalIn(one)).not.toBeNull()
  }
})

test("a refusal answers the whole call, wherever the search is in the chain", () => {
  expect(refusalIn("git status && git log -S one")).not.toBeNull()
  expect(refusalIn("git rev-list -G one ; echo done")).not.toBeNull()
})

test("the scope says what it refuses, where the rule comes from, and what it misses", () => {
  const said = SCOPE.join("\n")
  expect(said).toContain("--pickaxe-regex")
  expect(said).toContain("WHERE THE RULE COMES FROM")
  expect(said).toContain("load average from 63 to 82")
  expect(said).toContain("WHY NOT `--all`")
  expect(said).toContain("NOT REACHED")
  expect(said).toContain("`git grep`")
  expect(said).toContain("`git log --grep`")
  expect(said).toContain("A CALL IS READ AS BASH READS IT")
  expect(said).toContain("is NOT a finding that it is safe")
})

test("the hook refuses on stdin with exit 2 and a blocking decision", () => {
  const done = ran(["bun", SCRIPT], { stdin: Buffer.from(payloadOf("git log -S one")) })
  expect(done.code).toBe(2)
  const said = parseRefusal(done.out)
  expect(said.decision).toBe("block")
  expect(said.reason).toContain("search every commit in this repository")
})

test("the hook lets a call it does not name through on stdin", () => {
  const done = ran(["bun", SCRIPT], { stdin: Buffer.from(payloadOf("git log --oneline")) })
  expect(done.code).toBe(0)
  expect(done.out).toBe("")
})

test("a payload that will not parse judges nothing and exits so the dispatch passes", () => {
  const done = ran(["bun", SCRIPT], { stdin: Buffer.from("{") })
  expect(done.code).toBe(5)
  expect(done.err).toContain("the dispatch passes the call")
})

test("the hook prints its scope when it is asked", () => {
  const done = ran(["bun", SCRIPT, "--scope"], { stdin: Buffer.from("") })
  expect(done.code).toBe(0)
  expect(done.out).toContain("NOT REACHED")
})
