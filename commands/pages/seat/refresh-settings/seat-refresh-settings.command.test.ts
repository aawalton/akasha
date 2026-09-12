import { expect, test } from "bun:test"
import {
  answering,
  OK,
  OPERATIONAL,
  told,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import {
  isSpawnedSettings,
  objectIn,
  type Refreshing,
  type Row,
  refreshedRows,
  seatRefreshSettings,
  settingsPathIn,
} from "akasha/commands/pages/seat/refresh-settings/seat-refresh-settings.command.code.ts"

const GIVEN: Given = {
  root: "/repo",
  calledAs: "akasha seat refresh-settings",
  from: "/repo",
  writer: null,
  agentId: null,
}

const BASE: Record<string, unknown> = { model: "opus" }

const PATHS = ["/var/tmp/agent-settings-a.json", "/var/tmp/agent-settings-b.json"]

function outcomes(held: Readonly<Record<string, Row["outcome"]>>, stops?: string): Refreshing {
  return (path) => {
    if (path === stops) throw new Error(`${path} would not open`)
    return { path, outcome: held[path] ?? "refreshed" }
  }
}

function ranWith(refreshing: Refreshing) {
  return answering((done) => {
    const rows = refreshedRows(PATHS, BASE, done, refreshing)
    return told(rows.map((row) => `${row.path}\t${row.outcome}`))
  })
}

test("a word this does not take is refused", async () => {
  const said = await seatRefreshSettings(["--all"], GIVEN)
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("--json")
})

test("the settings file a process names is read off its command line", () => {
  expect(settingsPathIn(["claude", "--settings", "/var/tmp/agent-settings-a.json"])).toBe(
    "/var/tmp/agent-settings-a.json"
  )
  expect(settingsPathIn(["claude"])).toBe(null)
  expect(isSpawnedSettings("/var/tmp/agent-settings-a.json")).toBe(true)
  expect(isSpawnedSettings("/var/tmp/settings.json")).toBe(false)
  expect(objectIn("[1]")).toBe(null)
  expect(objectIn("{}")).toEqual({})
})

test("every file written is named, and one left alone is not", () => {
  const done: string[] = []
  const rows = refreshedRows(
    PATHS,
    BASE,
    done,
    outcomes({ "/var/tmp/agent-settings-b.json": "unchanged" })
  )
  expect(rows.map((row) => row.outcome)).toEqual(["refreshed", "unchanged"])
  expect(done).toEqual(["wrote /var/tmp/agent-settings-a.json again"])
})

test("a run that stopped part way names the files written before it stopped", () => {
  const done: string[] = []
  expect(() => refreshedRows(PATHS, BASE, done, outcomes({}, PATHS[1]))).toThrow("would not open")
  expect(done).toEqual(["wrote /var/tmp/agent-settings-a.json again"])
})

test("a run that stopped on the first file names nothing as written", () => {
  const done: string[] = []
  expect(() => refreshedRows(PATHS, BASE, done, outcomes({}, PATHS[0]))).toThrow("would not open")
  expect(done).toEqual([])
})

test("a run reaching every file answers with each file's outcome and refuses nothing", async () => {
  const said = await ranWith(outcomes({ "/var/tmp/agent-settings-b.json": "unchanged" }))
  expect(said.code).toBe(OK)
  expect(said.refusals).toEqual([])
  expect(said.report).toEqual([
    "/var/tmp/agent-settings-a.json\trefreshed",
    "/var/tmp/agent-settings-b.json\tunchanged",
  ])
})

test("a refusal after a write names exactly the files written before the fault", async () => {
  const said = await ranWith(outcomes({}, PATHS[1]))
  expect(said.code).toBe(OPERATIONAL)
  expect(said.report).toEqual(["wrote /var/tmp/agent-settings-a.json again"])
  expect(said.refusals[0]).toContain("would not open")
  const stopped = said.refusals.find((one) => one.includes("stopped part way"))
  expect(stopped).toContain("wrote /var/tmp/agent-settings-a.json again")
  expect(stopped).not.toContain("wrote /var/tmp/agent-settings-b.json again")
})

test("a refusal before any write is the fault alone", async () => {
  const said = await ranWith(outcomes({}, PATHS[0]))
  expect(said.code).toBe(OPERATIONAL)
  expect(said.report).toEqual([])
  expect(said.refusals[0]).toContain("would not open")
  expect(said.refusals.some((one) => one.includes("stopped part way"))).toBe(false)
})
