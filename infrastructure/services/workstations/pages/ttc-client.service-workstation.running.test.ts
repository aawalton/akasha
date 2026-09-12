import { expect, mock, test } from "bun:test"
import { homedir } from "node:os"

const HANDED: string[][] = []
const WORDS = 6
const PATH_AT = 4

const binaryRunning = await import(
  "akasha/infrastructure/services/workstations/binary-running/binary-running.module.code.ts"
)

mock.module(
  "akasha/infrastructure/services/workstations/binary-running/binary-running.module.code.ts",
  () => ({
    ...binaryRunning,
    runBinary: (argv: readonly string[]) => {
      HANDED.push([...argv])
      return Promise.resolve()
    },
  })
)

const running = await import(
  "akasha/infrastructure/services/workstations/pages/ttc-client.service-workstation.running.code.ts"
)

test("the run is a function taking nothing, which is how the service runner calls it", () => {
  expect(typeof running.runService).toBe("function")
  expect(running.runService.length).toBe(0)
})

test("the run is the only way into this file, so the service has one entry", () => {
  expect(Object.keys(running)).toEqual(["runService"])
})

test("a run hands the binary runner the program and the arguments rather than a command line", async () => {
  HANDED.length = 0
  await running.runService()
  expect(HANDED).toEqual([
    [
      "/usr/bin/protontricks-launch",
      "--no-term",
      "--appid",
      "306130",
      `${homedir()}/.steam/steam/steamapps/compatdata/306130/pfx/drive_c/users/steamuser/Documents/Elder Scrolls Online/live/AddOns/TamrielTradeCentre/Client/Client.exe`,
      "Silent",
    ],
  ])
})

test("the path the run quotes carries its spaces into one argument rather than four", async () => {
  HANDED.length = 0
  await running.runService()
  expect(HANDED[0]).toHaveLength(WORDS)
  expect(HANDED[0]?.[PATH_AT]).toContain("Elder Scrolls Online")
})

test("the home directory is worked out here rather than left to systemd", async () => {
  HANDED.length = 0
  await running.runService()
  expect(HANDED[0]?.[PATH_AT]?.startsWith(`${homedir()}/`)).toBe(true)
})

test("the run spawns nothing of its own, so the binary runner is the only way out", async () => {
  HANDED.length = 0
  await running.runService()
  expect(HANDED.length).toBe(1)
})
