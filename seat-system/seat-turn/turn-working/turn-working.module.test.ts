import { expect, test } from "bun:test"
import {
  anyLiveShell,
  anyLiveSubagent,
  anyWorking,
  anyWorkingRead,
  keptWorkingIn,
  scanRecords,
  taskEndedIn,
  taskStartedIn,
  taskStoppedIn,
  turnEnded,
  workingLines,
  workingOf,
} from "./turn-working.module.code.ts"

const ENDED = '{"type":"assistant","message":{"stop_reason":"end_turn"}}'

const MIDWAY = '{"type":"assistant","message":{"stop_reason":"tool_use"}}'

const ASKED = '{"type":"user","message":{"role":"user"}}'

const BETWEEN = '{"type":"bridge-session"}\n{"type":"cost-state"}\n{"type":"atis-latch"}'

const SHELL_BEGAN = '{"type":"user","toolUseResult":{"backgroundTaskId":"b4mfbpvps"}}'

const AGENT_BEGAN =
  '{"type":"user","toolUseResult":{"agentId":"a0720858045309f22","isAsync":true,"status":"async_launched"}}'

const SHELL_DONE =
  '{"type":"queue-operation","content":"<task-notification>\\n<task-id>b4mfbpvps</task-id>\\n<status>completed</status>\\n</task-notification>"}'

const AGENT_DONE =
  '{"type":"user","message":{"role":"user","content":"<task-notification>\\n<task-id>a0720858045309f22</task-id>\\n<status>completed</status>\\n</task-notification>"}}'

test("a seat is working where its last answer did not end the turn", () => {
  expect(anyWorking({ activeTurn: true })).toBe(true)
  expect(anyWorking({ activeTurn: false })).toBe(false)
})

test("unread is not off", () => {
  expect(anyWorkingRead({})).toBe(false)
  expect(anyWorking({})).toBe(false)
  expect(anyWorkingRead({ activeTurn: false })).toBe(true)
})

test("an answer ending the turn is told from one part way through", () => {
  expect(turnEnded({ kind: "assistant", stopReason: "end_turn" })).toBe(true)
  expect(turnEnded({ kind: "assistant", stopReason: "tool_use" })).toBe(false)
})

test("a prompt is no answer, so a prompt ends no turn", () => {
  expect(turnEnded({ kind: "user", stopReason: null })).toBe(false)
})

test("a prompt with nothing answering it yet is a turn still to finish", () => {
  const said = scanRecords(`${ENDED}\n${ASKED}`, {}).answer

  expect(said?.kind).toBe("user")
  expect(said === null ? null : turnEnded(said)).toBe(false)
})

test("a turn answered to its end is finished", () => {
  const said = scanRecords(`${ASKED}\n${MIDWAY}\n${ENDED}`, {}).answer

  expect(said?.kind).toBe("assistant")
  expect(said === null ? null : turnEnded(said)).toBe(true)
})

test("what the harness keeps between turns neither starts nor ends one", () => {
  expect(scanRecords(`${ENDED}\n${BETWEEN}`, {}).answer?.kind).toBe("assistant")
  expect(scanRecords(`${ASKED}\n${BETWEEN}`, {}).answer?.kind).toBe("user")
})

test("a stretch holding neither a prompt nor an answer answers nothing", () => {
  expect(scanRecords(BETWEEN, {}).answer).toBeNull()
  expect(scanRecords("", {}).answer).toBeNull()
})

test("a line that will not parse is passed over", () => {
  expect(scanRecords(`${ENDED}\nba`, {}).answer?.stopReason).toBe("end_turn")
})

test("a background command and a subagent are told apart by what starts them", () => {
  expect(taskStartedIn({ backgroundTaskId: "b4mfbpvps" })).toEqual({
    id: "b4mfbpvps",
    kind: "shell",
  })
  expect(taskStartedIn({ agentId: "a072", isAsync: true })).toEqual({ id: "a072", kind: "agent" })
})

test("a subagent that was awaited in the turn starts no task", () => {
  expect(taskStartedIn({ agentId: "a072" })).toBeNull()
  expect(taskStartedIn(null)).toBeNull()
  expect(taskStartedIn({ backgroundTaskId: "" })).toBeNull()
})

test("a notification names the task the notification ends", () => {
  expect(taskEndedIn("<task-notification>\n<task-id>b4mfbpvps</task-id>\n")).toBe("b4mfbpvps")
  expect(taskEndedIn("nothing here")).toBeNull()
  expect(taskEndedIn("<task-id>")).toBeNull()
})

test("a task started and never notified is still live", () => {
  const found = scanRecords(`${SHELL_BEGAN}\n${AGENT_BEGAN}\n${ENDED}`, {})

  expect(found.openShells).toEqual(["b4mfbpvps"])
  expect(found.openAgents).toEqual(["a0720858045309f22"])
  expect(anyLiveShell(found)).toBe(true)
  expect(anyLiveSubagent(found)).toBe(true)
})

test("a task the notification named is live no longer", () => {
  const found = scanRecords(`${SHELL_BEGAN}\n${AGENT_BEGAN}\n${SHELL_DONE}\n${AGENT_DONE}`, {})

  expect(found.openShells).toEqual([])
  expect(found.openAgents).toEqual([])
})

test("a task carries over from the stretch read before it", () => {
  const found = scanRecords(ENDED, { openAgents: ["a0720858045309f22"] })

  expect(found.openAgents).toEqual(["a0720858045309f22"])
  expect(scanRecords(AGENT_DONE, { openAgents: ["a0720858045309f22"] }).openAgents).toEqual([])
})

test("a task started again after its notification is live again", () => {
  const found = scanRecords(`${AGENT_BEGAN}\n${AGENT_DONE}\n${AGENT_BEGAN}`, {})

  expect(found.openAgents).toEqual(["a0720858045309f22"])
})

const AGENT_STOPPED =
  '{"type":"user","toolUseResult":{"message":"Successfully stopped task: a0720858045309f22 (Census)","task_id":"a0720858045309f22","task_type":"local_agent","command":"c"}}'

test("a stop names the task the stop ends", () => {
  expect(taskStoppedIn({ task_id: "b4mfbpvps", task_type: "local_bash" })).toBe("b4mfbpvps")
  expect(taskStoppedIn({ task_id: "b4mfbpvps" })).toBeNull()
  expect(taskStoppedIn({ backgroundTaskId: "b4mfbpvps" })).toBeNull()
})

test("a task the seat stopped is live no longer", () => {
  const found = scanRecords(`${AGENT_BEGAN}\n${AGENT_STOPPED}`, {})

  expect(found.openAgents).toEqual([])
  expect(anyLiveSubagent(found)).toBe(false)
})

test("a reading kept in a shape this does not know is unread", () => {
  expect(keptWorkingIn(null)).toEqual({})
  expect(keptWorkingIn("working")).toEqual({})
  expect(keptWorkingIn([])).toEqual({})
  expect(keptWorkingIn({ activeTurn: "yes" })).toEqual({})
  expect(keptWorkingIn({ activeTurn: true, scannedTo: 12, openShells: ["b4"] })).toEqual({
    activeTurn: true,
    scannedTo: 12,
    openShells: ["b4"],
  })
  expect(keptWorkingIn({ openAgents: ["a0", 7, ""] })).toEqual({ openAgents: ["a0"] })
})

test("a seat akasha holds nothing for is unread", () => {
  expect(workingOf("")).toEqual({})
  expect(workingLines({})[0]?.includes("unread")).toBe(true)
  expect(workingLines({}).some((one) => one.includes("none"))).toBe(true)
})
