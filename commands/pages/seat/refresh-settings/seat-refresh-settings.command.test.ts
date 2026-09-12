import { expect, test } from "bun:test"
import {
  isSpawnedSettings,
  objectIn,
  type Refreshing,
  type Row,
  refreshedRows,
  seatRefreshSettings,
  settingsPathIn,
} from "akasha/commands/pages/seat/refresh-settings/seat-refresh-settings.command.code.ts"

const BASE: Record<string, unknown> = { model: "opus" }

const PATHS = ["/var/tmp/agent-settings-a.json", "/var/tmp/agent-settings-b.json"]

function outcomes(held: Readonly<Record<string, Row["outcome"]>>, stops?: string): Refreshing {
  return (path) => {
    if (path === stops) throw new Error(`${path} would not open`)
    return { path, outcome: held[path] ?? "refreshed" }
  }
}

test("a word this does not take is refused", async () => {
  const said = await seatRefreshSettings(["--all"])
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
