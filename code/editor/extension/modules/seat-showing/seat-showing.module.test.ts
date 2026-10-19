import { expect, mock, test } from "bun:test"

const SHOWN: string[] = []

const OPENED: string[] = []

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

mock.module("vscode", () => ({
  Uri: { parse: (url: string) => ({ toString: () => url }) },
  env: {
    openExternal: async (uri: { toString: () => string }) => {
      OPENED.push(uri.toString())
      return true
    },
  },
  window: { terminals: TERMINALS },
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
    openColumns: () => [],
  })
)

const { openSeat } = await import(
  "akasha/code/editor/extension/modules/seat-showing/seat-showing.module.code.ts"
)

const ATHENA = { id: "01a0d3de-5833-7000-b90e-a639d4f99cd4", name: "athena" }

const NIMUE = { id: "01a0d3de-5833-7000-b90e-a639d4f99ce5", name: "nimue" }

test("choosing a seat with a terminal here brings that terminal forward and opens nothing", async () => {
  SHOWN.length = 0
  OPENED.length = 0
  TERMINALS.splice(0, TERMINALS.length, terminal("athena"))
  await openSeat(ATHENA)
  expect(SHOWN).toEqual(["athena"])
  expect(OPENED).toEqual([])
})

test("choosing a seat with no terminal here opens that seat's page in the browser", async () => {
  SHOWN.length = 0
  OPENED.length = 0
  TERMINALS.splice(0, TERMINALS.length)
  await openSeat(ATHENA)
  expect(SHOWN).toEqual([])
  expect(OPENED).toEqual(["https://alanwalton.com/seat/athena-d4f99cd4"])
})

test("a terminal holding another seat is not brought forward for this one", async () => {
  SHOWN.length = 0
  OPENED.length = 0
  TERMINALS.splice(0, TERMINALS.length, terminal("athena"))
  await openSeat(NIMUE)
  expect(SHOWN).toEqual([])
  expect(OPENED).toEqual(["https://alanwalton.com/seat/nimue-d4f99ce5"])
})

test("a row that is no seat opens nothing", async () => {
  SHOWN.length = 0
  OPENED.length = 0
  TERMINALS.splice(0, TERMINALS.length, terminal("athena"))
  await openSeat({ kind: "root" })
  expect(SHOWN).toEqual([])
  expect(OPENED).toEqual([])
})
