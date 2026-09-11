import { afterAll, expect, test } from "bun:test"
import { readFileSync } from "node:fs"
import { join } from "node:path"
import {
  answerFor,
  firstLineOf,
  headFor,
  quoted,
  scriptAt,
  wrappedFor,
} from "akasha/agents/hooks/agent-hooks/weigh-bash-call/weigh-bash-call.agent-hook.code.ts"
import { rootOf } from "akasha/commands/modules/rooting/rooting.module.code.ts"
import { scratchWorld } from "akasha/commands/modules/scratching/scratching.module.code.ts"
import { ran } from "akasha/utils/run/running/running.module.code.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

const HEAD = '{"phase":"bash","ran":"probe",'

function weighed(command: string, at: string): ReturnType<typeof ran> {
  const script = scriptAt(rootOf(import.meta.path))
  if (script === null) throw new Error("the weighing script is not there")
  return ran(["bash", "-c", wrappedFor(script, at, HEAD, command)])
}

test("a word carrying a quote is handed to the shell whole", () => {
  expect(quoted("held")).toBe("'held'")
  expect(quoted("it's")).toBe("'it'\\''s'")
})

test("what a call is named by is the first line the agent wrote", () => {
  expect(firstLineOf("\n\n  akasha change list  \nmore\n")).toBe("akasha change list")
  expect(firstLineOf("   \n")).toBe("")
})

test("a line's opening names the run and the phase and what ran", () => {
  const head = headFor("one", "2026-09-11T00:00:00.000Z", "echo 'hi'\nrest")
  expect(head).toBe(
    '{"runId":"one","ranAt":"2026-09-11T00:00:00.000Z","phase":"bash","ran":"echo \'hi\'",'
  )
})

test("the command an agent wrote is left whole under the line that reads the script", () => {
  const said = wrappedFor("/s.sh", "/at.jsonl", HEAD, "echo one\necho two")
  expect(said.split("\n")[0]).toBe(`. '/s.sh' '/at.jsonl' '${HEAD}'`)
  expect(said.endsWith("echo one\necho two")).toBe(true)
})

test("a weighed call leaves the streams and the status as the call left them", () => {
  const at = join(scratch.rootFor("weigh-"), "out.jsonl")
  const said = weighed("printf out; printf err 1>&2; exit 3", at)
  expect(said.out).toBe("out")
  expect(said.err).toBe("err")
  expect(said.code).toBe(3)
})

test("a weighed call appends one line saying what that call spent", () => {
  const at = join(scratch.rootFor("weigh-"), "out.jsonl")
  expect(weighed("bun -e 'new Uint8Array(200e6).fill(1)'", at).code).toBe(0)
  const held = readFileSync(at, "utf8").trim().split("\n")
  expect(held.length).toBe(1)
  const line = JSON.parse(held[0] ?? "") as Record<string, number | string | boolean>
  expect(line.phase).toBe("bash")
  expect(line.ran).toBe("probe")
  expect(Number(line.childCpuSeconds)).toBeGreaterThan(0)
  expect(Number(line.wallMs)).toBeGreaterThan(0)
})

test("a call the shell ended of its own accord is weighed as readily", () => {
  const at = join(scratch.rootFor("weigh-"), "out.jsonl")
  expect(weighed("exit 7", at).code).toBe(7)
  expect(readFileSync(at, "utf8").trim().split("\n").length).toBe(1)
})

test("a call running subshells is weighed once", () => {
  const at = join(scratch.rootFor("weigh-"), "out.jsonl")
  expect(weighed("( echo one ); x=$(echo two); echo $x", at).code).toBe(0)
  expect(readFileSync(at, "utf8").trim().split("\n").length).toBe(1)
})

test("a payload naming no command is left alone", () => {
  const root = rootOf(import.meta.path)
  expect(answerFor({ hook_event_name: "PreToolUse", tool_input: {} }, root).out).toBe("")
  expect(answerFor({ hook_event_name: "PreToolUse" }, root).out).toBe("")
})
