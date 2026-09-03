import { expect, test } from "bun:test"
import { buildReExecArgv, decideBootResume, parseArgs } from "./supervisor-args.module.code.ts"

test("parsing stops at the first argument that is not a flag", () => {
  const held = parseArgs(["--headless", "-a", "aawalton", "do", "--the", "work"])
  expect(held.headless).toBe(true)
  expect(held.account).toBe("aawalton")
  expect(held.prompt).toBe("do --the work")
})

test("an empty line states no prompt and no resume", () => {
  const held = parseArgs([])
  expect(held.prompt).toBe("")
  expect(held.resume).toBe(false)
  expect(held.sessionId).toBeUndefined()
})

test("an exit-after-iterations that is not a positive integer is refused", () => {
  expect(() => parseArgs(["--exit-after-iterations", "0"])).toThrow()
  expect(() => parseArgs(["--exit-after-iterations", "two"])).toThrow()
  expect(parseArgs(["--exit-after-iterations", "3"]).exitAfterIterations).toBe(3)
})

test("neither a resume flag nor a session id is no resume", () => {
  expect(
    decideBootResume({ resume: false, sessionId: undefined, prompt: "", headless: false })
  ).toEqual({ resume: false })
})

test("a session id resumes even with no resume flag", () => {
  expect(decideBootResume({ resume: false, sessionId: "s", prompt: "", headless: true })).toEqual({
    resume: true,
    driver: "awaiting-inbound",
  })
})

test("a prompt drives the resume rather than what is inbound", () => {
  expect(
    decideBootResume({ resume: true, sessionId: undefined, prompt: "go", headless: true })
  ).toEqual({ resume: true, driver: "argv-prompt" })
})

test("a headed resume with no prompt waits on the operator", () => {
  expect(
    decideBootResume({ resume: true, sessionId: undefined, prompt: "", headless: false })
  ).toEqual({ resume: true, driver: "operator-prompt" })
})

test("a re-exec line carries the new agent and session rather than the old ones", () => {
  const held = buildReExecArgv({
    originalArgv: ["--agent-id", "old", "--session-id", "gone", "-r", "--headless"],
    agentId: "new",
    sessionId: "fresh",
  })
  expect(held).toEqual(["--headless", "--agent-id", "new", "--session-id", "fresh", "--resume"])
})

test("a re-exec line injects before the prompt rather than after it", () => {
  const held = buildReExecArgv({
    originalArgv: ["-a", "aawalton", "carry", "on"],
    agentId: "new",
    sessionId: "fresh",
  })
  expect(held).toEqual([
    "-a",
    "aawalton",
    "--agent-id",
    "new",
    "--session-id",
    "fresh",
    "--resume",
    "carry",
    "on",
  ])
})
