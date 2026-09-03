import { expect, test } from "bun:test"
import type { Given } from "../../calling/calling.module.code.ts"
import { loki, readIn } from "./loki.command.code.ts"

function given(root: string): Given {
  return { root, calledAs: "akasha loki", from: root, writer: null, agentId: null }
}

test("nothing said is refused, naming the act it carries", async () => {
  const said = await loki([], given("/nowhere"))
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("logs")
})

test("an act it does not carry is refused", async () => {
  const said = await loki(["streams"], given("/nowhere"))
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("streams")
})

test("an act naming no pod is refused", () => {
  expect("refused" in readIn(["logs"])).toBe(true)
})

test("a pod said as a word stands where the flag would", () => {
  const read = readIn(["logs", "my-pod"])
  expect("refused" in read).toBe(false)
  if ("refused" in read) return
  expect(read.pod).toBe("my-pod")
})

test("a pod said twice, once as a word and once as a flag, is refused", () => {
  expect("refused" in readIn(["logs", "my-pod", "--pod", "other-pod"])).toBe(true)
})

test("the namespace, the window and the limit stand where none is said", () => {
  const read = readIn(["logs", "my-pod"])
  expect("refused" in read).toBe(false)
  if ("refused" in read) return
  expect(read.namespace).toBe("ci")
  expect(read.since).toBe("1h")
  expect(read.limit).toBe(500)
})

test("`--tail` names the same thing `--limit` names", () => {
  const read = readIn(["logs", "my-pod", "--tail", "100"])
  expect("refused" in read).toBe(false)
  if ("refused" in read) return
  expect(read.limit).toBe(100)
})

test("a window in no unit this reads is refused", () => {
  expect("refused" in readIn(["logs", "my-pod", "--since", "1 fortnight"])).toBe(true)
})

test("a limit that is no positive whole number is refused", () => {
  expect("refused" in readIn(["logs", "my-pod", "--limit", "0"])).toBe(true)
  expect("refused" in readIn(["logs", "my-pod", "--limit", "-3"])).toBe(true)
})

test("a stamp is read before any query, so a malformed one is refused", () => {
  expect("refused" in readIn(["logs", "my-pod", "--commit-sha", "abc"])).toBe(true)
  expect("refused" in readIn(["logs", "my-pod", "--inputs-hash", "nothex123456"])).toBe(true)
  const read = readIn([
    "logs",
    "my-pod",
    "--commit-sha",
    "1234567890abcdef1234567890abcdef12345678",
    "--inputs-hash",
    "0123456789ab",
  ])
  expect("refused" in read).toBe(false)
  if ("refused" in read) return
  expect(read.commitSha).toBe("1234567890abcdef1234567890abcdef12345678")
  expect(read.inputsHash).toBe("0123456789ab")
})

test("a flag it does not take is refused", async () => {
  const said = await loki(["logs", "my-pod", "--json"], given("/nowhere"))
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("--json")
})

test("a valued flag naming no value is refused", () => {
  expect("refused" in readIn(["logs", "my-pod", "--since"])).toBe(true)
})

test("reaching every line is read, and it names no cursor", () => {
  const read = readIn(["logs", "my-pod", "--all"])
  expect("refused" in read).toBe(false)
  if ("refused" in read) return
  expect(read.all).toBe(true)
  expect(read.cursor).toBeNull()
})
