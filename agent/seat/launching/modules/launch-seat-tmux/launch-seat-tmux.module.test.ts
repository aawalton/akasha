import { expect, test } from "bun:test"
import { existsSync, mkdtempSync, readFileSync } from "node:fs"
import {
  keptPrompt,
  launching,
  promptFileAt,
  respawnPaneLine,
} from "akasha/agent/seat/launching/seat-launching.module.code.ts"
import {
  asked,
  HOME,
  launchedWith,
  ROOT,
} from "akasha/agent/seat/launching/seat-launching.module.test-fixtures.ts"

const TMUX_COMMAND_LIMIT = 16_000

const SCRATCH = "/var/tmp/launch-seat-tmux-"

const AT = 1700000000000

const FAR_PAST_THE_LIMIT = "x".repeat(1_000_000)

test("a respawn line for a prompt far past tmux's limit stays under that limit", () => {
  const file = promptFileAt(HOME, "athena-a2de5a24130090204", AT)
  const line = respawnPaneLine(ROOT, asked({ prompt: FAR_PAST_THE_LIMIT }), AT, file)
  expect(line.length).toBeLessThan(TMUX_COMMAND_LIMIT)
  expect(line.endsWith(`'--prompt-file' '${file}'`)).toBe(true)
})

test("a fresh launch for a prompt far past tmux's limit stays under that limit", async () => {
  const { how, calls } = launchedWith(() => null)
  await launching(asked({ prompt: FAR_PAST_THE_LIMIT }), ROOT, how)
  const started = calls.find((one) => one.includes("new-session")) ?? []
  expect(started.join(" ").length).toBeLessThan(TMUX_COMMAND_LIMIT)
  expect(started.slice(-2)).toEqual([
    "--prompt-file",
    promptFileAt(HOME, "athena-a2de5a24130090204", AT),
  ])
})

test("a prompt is kept whole in a file, and the agent's earlier prompt is taken", () => {
  const home = mkdtempSync(SCRATCH)
  const prompt = `it's "all" here\n${FAR_PAST_THE_LIMIT}`
  const earlier = keptPrompt(home, "aid", "before", 1)
  const file = keptPrompt(home, "aid", prompt, 2)
  expect(file).toBe(promptFileAt(home, "aid", 2))
  expect(readFileSync(file ?? "", "utf8")).toBe(prompt)
  expect(existsSync(earlier ?? "")).toBe(false)
})

test("an empty prompt is kept in no file", () => {
  expect(keptPrompt(mkdtempSync(SCRATCH), "aid", "", 1)).toBe(null)
})
