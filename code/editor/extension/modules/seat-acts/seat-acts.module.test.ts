import { expect, mock, test } from "bun:test"
import { SEAT_ATTACH_FN } from "akasha/code/shell/terminal/modules/terminal-seat-marks/terminal-seat-marks.module.code.ts"

const SHOWN: string[] = []

const SENT: string[] = []

const RAN: { readonly command: string; readonly agentId: unknown }[] = []

const SHELL_PID = 41

const TERMINALS: { name: string; processId: Promise<number>; show: () => undefined }[] = []

function terminal(name: string): (typeof TERMINALS)[number] {
  return {
    name,
    processId: Promise.resolve(SHELL_PID),
    show: () => {
      SHOWN.push(name)
      return undefined
    },
  }
}

function clear(): undefined {
  SHOWN.length = 0
  SENT.length = 0
  RAN.length = 0
  return undefined
}

mock.module("vscode", () => ({
  window: {
    terminals: TERMINALS,
    createTerminal: () => ({
      sendText: (line: string) => {
        SENT.push(line)
        return undefined
      },
      show: () => {
        SHOWN.push("new terminal")
        return undefined
      },
    }),
    showErrorMessage: async () => undefined,
  },
  commands: {
    executeCommand: async (command: string, args: { agentId?: unknown }) => {
      RAN.push({ command, agentId: args.agentId })
      return undefined
    },
  },
}))

mock.module(
  "akasha/code/editor/extension/modules/agent-tree-state/agent-tree-state.module.code.ts",
  () => ({
    output: { appendLine: () => undefined },
    forest: [],
    columns: { recall: () => undefined },
    seatTerminals: [],
    seatTabs: new Map(),
  })
)

mock.module(
  "akasha/code/editor/extension/modules/seat-terminals/seat-terminals.module.code.ts",
  () => ({
    readSeatLookup: () => new Map([[SHELL_PID, "athena"]]),
    groupForTerminal: () => undefined,
    openColumns: () => [1],
  })
)

mock.module(
  "akasha/code/editor/extension/modules/harness-call/harness-call.module.code.ts",
  () => ({
    akashaRoot: () => "/nowhere",
    callHarness: async () => undefined,
    LANDING_TIMEOUT_MS: 1,
  })
)

const { openSeat } = await import(
  "akasha/code/editor/extension/modules/seat-acts/seat-acts.module.code.ts"
)

const ATHENA = { id: "01a0d3de-5833-7000-b90e-a639d4f99cd4", name: "athena" }

test("choosing a seat with a terminal here brings that terminal forward and opens nothing", async () => {
  clear()
  TERMINALS.splice(0, TERMINALS.length, terminal("athena"))
  await openSeat({ ...ATHENA, live: true, place: "interactive" })
  expect(SHOWN).toEqual(["athena"])
  expect(SENT).toEqual([])
  expect(RAN).toEqual([])
})

test("choosing a running interactive seat with no terminal here attaches a new terminal tab", async () => {
  clear()
  TERMINALS.splice(0, TERMINALS.length)
  await openSeat({ ...ATHENA, live: true, place: "interactive" })
  expect(SENT).toEqual([`${SEAT_ATTACH_FN} "athena"`])
  expect(SHOWN).toEqual(["new terminal"])
  expect(RAN).toEqual([])
})

test("choosing a stopped seat with no terminal here opens its transcript", async () => {
  clear()
  TERMINALS.splice(0, TERMINALS.length)
  await openSeat({ ...ATHENA, live: false, place: "interactive" })
  expect(SENT).toEqual([])
  expect(RAN).toEqual([{ command: "opsTranscript.open", agentId: ATHENA.id }])
})

test("choosing a headless seat with no terminal here opens its transcript", async () => {
  clear()
  TERMINALS.splice(0, TERMINALS.length)
  await openSeat({ ...ATHENA, live: true, place: "headless" })
  expect(SENT).toEqual([])
  expect(RAN).toEqual([{ command: "opsTranscript.open", agentId: ATHENA.id }])
})

test("a row that is no seat opens nothing", async () => {
  clear()
  TERMINALS.splice(0, TERMINALS.length, terminal("athena"))
  await openSeat({ kind: "root" })
  expect(SHOWN).toEqual([])
  expect(SENT).toEqual([])
  expect(RAN).toEqual([])
})
