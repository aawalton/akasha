import { expect, test } from "bun:test"
import {
  judgedFor,
  refusalFor,
} from "akasha/agent/hook/agent-hook/block-memory-writes/block-memory-writes.agent-hook.code.ts"
import { LET_THROUGH } from "akasha/agent/hook/modules/answer/hook-answer.module.code.ts"

const HELD: readonly string[] = ["/held"]

test("a write landing under a mount held in memory is refused", () => {
  const said = refusalFor("echo hi > /held/one.txt", "/", HELD) ?? ""

  expect(said).toContain("which this machine holds in memory")
  expect(said).toContain("/var/tmp")
})

test("the refusal names the mount rather than the path alone", () => {
  expect(refusalFor("cp /var/tmp/x /held/one.txt", "/", HELD) ?? "").toContain("`/held`")
})

test("a removal is let through, because a removal is what gives the memory back", () => {
  expect(refusalFor("rm -f /held/one.txt", "/", HELD)).toBeNull()
  expect(refusalFor("rmdir /held/one", "/", HELD)).toBeNull()
})

test("a write landing outside those mounts is let through", () => {
  expect(refusalFor("echo hi > /var/tmp/one.txt", "/", HELD)).toBeNull()
})

test("a machine holding nothing in memory refuses nothing", () => {
  expect(refusalFor("echo hi > /held/one.txt", "/", [])).toBeNull()
})

test("the judgement this hook exports leaves a write on the disk alone", () => {
  expect(judgedFor({ tool_input: { command: "echo hi > /var/tmp/held.txt" } })).toEqual(LET_THROUGH)
})

test("the judgement this hook exports reads the command out of the tool input alone", () => {
  expect(judgedFor({ tool_name: "Bash" })).toEqual(LET_THROUGH)
})
