import { expect, test } from "bun:test"
import {
  anyLiveShell,
  anyWorking,
  anyWorkingRead,
  interruptedIn,
  keptWorkingIn,
  scanRecords,
  shellStartedIn,
  taskEndedIn,
  taskStoppedIn,
  turnEnded,
  withNothingOpen,
  workingOf,
} from "akasha/seat-system/seat-observation/seat-turn/turn-working/turn-working.module.code.ts"

const ENDED = '{"type":"assistant","message":{"stop_reason":"end_turn"}}'

const MIDWAY = '{"type":"assistant","message":{"stop_reason":"tool_use"}}'

const ASKED = '{"type":"user","message":{"role":"user"}}'

const INTERRUPTED =
  '{"type":"user","message":{"role":"user","content":[{"type":"text","text":"[Request interrupted by user]"}]}}'

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

test("a prompt saying the user interrupted the request ends the turn", () => {
  const said = scanRecords(`${MIDWAY}\n${INTERRUPTED}`, {}).answer

  expect(said?.kind).toBe("user")
  expect(said === null ? null : turnEnded(said)).toBe(true)
})

test("the interrupt is read whether its text is a string or a run of blocks", () => {
  expect(interruptedIn({ message: { content: "[Request interrupted by user]" } })).toBe(true)
  expect(
    interruptedIn({ content: [{ type: "text", text: "[Request interrupted by user]" }] })
  ).toBe(true)
  expect(interruptedIn({ message: { content: [{ type: "text", text: "carry on" }] } })).toBe(false)
  expect(interruptedIn({})).toBe(false)
})

test("an answer carrying the interrupt's words ends no turn of its own", () => {
  const said = scanRecords(
    '{"type":"assistant","message":{"stop_reason":"tool_use","content":[{"type":"text","text":"[Request interrupted by user]"}]}}',
    {}
  ).answer

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

test("a line that will not parse is stepped over", () => {
  expect(scanRecords(`${ENDED}\nba`, {}).answer?.stopReason).toBe("end_turn")
})

test("a background command starts the task the transcript names", () => {
  expect(shellStartedIn({ backgroundTaskId: "b4mfbpvps" })).toBe("b4mfbpvps")
  expect(shellStartedIn({ backgroundTaskId: "" })).toBeNull()
  expect(shellStartedIn(null)).toBeNull()
})

test("a subagent starts no task here, because a subagent's page is where it is declared", () => {
  expect(shellStartedIn({ agentId: "a0720858045309f22", isAsync: true })).toBeNull()
})

test("a notification names the task the notification ends", () => {
  expect(taskEndedIn("<task-notification>\n<task-id>b4mfbpvps</task-id>\n")).toBe("b4mfbpvps")
  expect(taskEndedIn("nothing here")).toBeNull()
  expect(taskEndedIn("<task-id>")).toBeNull()
})

test("a task started and never notified is still live", () => {
  const found = scanRecords(`${SHELL_BEGAN}\n${ENDED}`, {})

  expect(found.openShells).toEqual(["b4mfbpvps"])
  expect(anyLiveShell(found)).toBe(true)
})

test("a task the notification named is live no longer", () => {
  const found = scanRecords(`${SHELL_BEGAN}\n${SHELL_DONE}`, {})

  expect(found.openShells).toEqual([])
})

test("a task carries over from the stretch read before it", () => {
  const found = scanRecords(ENDED, { openShells: ["b4mfbpvps"] })

  expect(found.openShells).toEqual(["b4mfbpvps"])
  expect(scanRecords(SHELL_DONE, { openShells: ["b4mfbpvps"] }).openShells).toEqual([])
})

test("a task started again after its notification is live again", () => {
  const found = scanRecords(`${SHELL_BEGAN}\n${SHELL_DONE}\n${SHELL_BEGAN}`, {})

  expect(found.openShells).toEqual(["b4mfbpvps"])
})

const SHELL_STOPPED =
  '{"type":"user","toolUseResult":{"message":"Successfully stopped task: b4mfbpvps (Census)","task_id":"b4mfbpvps","task_type":"local_bash","command":"c"}}'

const AGENT_STOPPED =
  '{"type":"user","toolUseResult":{"message":"Successfully stopped task: a0720858045309f22 (Census)","task_id":"a0720858045309f22","task_type":"local_agent","command":"c"}}'

test("a stop names the task the stop ends", () => {
  expect(taskStoppedIn({ task_id: "b4mfbpvps", task_type: "local_bash" })).toBe("b4mfbpvps")
  expect(taskStoppedIn({ task_id: "b4mfbpvps" })).toBeNull()
  expect(taskStoppedIn({ backgroundTaskId: "b4mfbpvps" })).toBeNull()
})

test("a task the seat stopped is live no longer", () => {
  const found = scanRecords(`${SHELL_BEGAN}\n${SHELL_STOPPED}`, {})

  expect(found.openShells).toEqual([])
  expect(anyLiveShell(found)).toBe(false)
})

test("what a subagent writes into the transcript leaves the background commands alone", () => {
  const found = scanRecords(`${SHELL_BEGAN}\n${AGENT_BEGAN}\n${AGENT_DONE}\n${AGENT_STOPPED}`, {})

  expect(found.openShells).toEqual(["b4mfbpvps"])
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
  expect(keptWorkingIn({ openShells: ["b4", 7, ""] })).toEqual({ openShells: ["b4"] })
})

test("a list of subagents a reading kept before this is passed over", () => {
  expect(keptWorkingIn({ scannedTo: 12, openAgents: ["a0"] })).toEqual({ scannedTo: 12 })
})

test("a seat akasha holds nothing for is unread", () => {
  expect(workingOf("")).toEqual({})
})

test("a client spawned afresh runs no task the client before it started", () => {
  expect(withNothingOpen({ activeTurn: false, scannedTo: 90, openShells: ["b4"] })).toEqual({
    activeTurn: false,
    scannedTo: 90,
    openShells: [],
  })
})

test("the byte the transcript was read to survives the tasks going", () => {
  expect(withNothingOpen({ scannedTo: 90, openShells: ["b4"] }).scannedTo).toBe(90)
})

test("a reading with nothing open is left as the reading is", () => {
  const was = { activeTurn: true, scannedTo: 4, openShells: [] }
  expect(withNothingOpen(was)).toEqual(was)
})

test("no task is live once the tasks have gone", () => {
  expect(anyLiveShell(withNothingOpen({ openShells: ["b4"] }))).toBe(false)
})
