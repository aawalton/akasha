import { expect, test } from "bun:test"
import type { Given } from "../../calling/calling.module.code.ts"
import { page, readIn, undeclared, valueOf } from "./page.command.code.ts"

function given(root: string): Given {
  return { root, calledAs: "akasha page", from: root, writer: null, agentId: null }
}

const AT = "akasha/agents/claude-accounts/pages/one.claude-account.ts"

test("nothing said is refused, naming what it acts on", () => {
  const said = page([], given("/nowhere"))
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("secret")
})

test("a subject it does not act on is refused", () => {
  expect(page(["icon"], given("/nowhere")).code).toBe(1)
})

test("a subject named with no act is refused, naming the acts", () => {
  const said = page(["secret"], given("/nowhere"))
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("show")
  expect(said.refusals[0]).toContain("clear")
})

test("an act it does not do is refused", () => {
  expect(page(["secret", "burn", "--file-path", AT], given("/nowhere")).code).toBe(1)
})

test("a flag it does not take is refused", () => {
  const said = page(["secret", "show", "--file-path", AT, "--wat"], given("/nowhere"))
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("--wat")
})

test("an act naming no page is refused", () => {
  const said = page(["secret", "show"], given("/nowhere"))
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("--file-path")
})

test("a reveal naming no key is refused", () => {
  const said = page(["secret", "reveal", "--file-path", AT], given("/nowhere"))
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("--key")
})

test("a show naming a key is refused, since a show names every key", () => {
  const said = page(
    ["secret", "show", "--file-path", AT, "--key", "accessToken"],
    given("/nowhere")
  )
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("--key")
})

test("a second word after the act is refused", () => {
  const read = readIn(["secret", "show", "again", "--file-path", AT])
  expect("refused" in read).toBe(true)
})

test("a flag standing where its value should be is refused rather than read as the value", () => {
  const read = readIn(["secret", "show", "--file-path", "--key"])
  expect("refused" in read).toBe(true)
})

test("a flag said twice is refused", () => {
  const read = readIn(["secret", "show", "--file-path", AT, "--file-path", AT])
  expect("refused" in read).toBe(true)
})

test("what is read carries the words and the flags apart", () => {
  const read = readIn([
    "secret",
    "set",
    "--file-path",
    AT,
    "--key",
    "accessToken",
    "--message",
    "m",
  ])
  expect(read).toEqual({
    subject: "secret",
    act: "set",
    path: AT,
    key: "accessToken",
    message: "m",
  })
})

test("a page standing at no path is a data refusal, apart from a word it does not take", () => {
  const said = page(
    ["secret", "show", "--file-path", "akasha/nowhere/none.seat.ts"],
    given("/nowhere")
  )
  expect(said.code).toBe(2)
})

test("a key the page type does not declare secret is named against the ones it does", () => {
  const wrong = undeclared("wat", { path: AT, sidecar: "x.sops.yaml", declared: ["accessToken"] })
  expect(wrong).toContain("wat")
  expect(wrong).toContain("accessToken")
})

test("a key the page type declares secret passes", () => {
  expect(
    undeclared("accessToken", { path: AT, sidecar: "x", declared: ["accessToken"] })
  ).toBeNull()
})

test("a page type declaring no secret says so rather than naming nothing", () => {
  expect(undeclared("wat", { path: AT, sidecar: "x", declared: [] })).toContain("declares none")
})

test("one trailing newline is dropped from a value piped in", () => {
  expect(valueOf(new TextEncoder().encode("held\n"))).toBe("held")
})

test("a value carrying no trailing newline is taken whole", () => {
  expect(valueOf(new TextEncoder().encode("held"))).toBe("held")
})

test("a value holding a newline of its own is refused", () => {
  expect(valueOf(new TextEncoder().encode("one\ntwo\n"))).toEqual({
    refused: "what was piped in holds a newline, and a secret's value is one line",
  })
})

test("a value that arrives empty is refused rather than standing for a usable one", () => {
  const said = valueOf(new TextEncoder().encode("\n"))
  expect(typeof said).toBe("object")
})

test("what is piped in that is no utf-8 text is refused", () => {
  const said = valueOf(new Uint8Array([0xff, 0xfe, 0xfd]))
  expect(typeof said).toBe("object")
})
