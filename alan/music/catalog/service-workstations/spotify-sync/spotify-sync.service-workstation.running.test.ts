import { afterEach, expect, mock, test } from "bun:test"

const HANDED: unknown[][] = []

let answering: () => Promise<number> = () => Promise.resolve(0)

const syncing = await import(
  "akasha/alan/music/catalog/modules/release-syncing/release-syncing.module.code.ts"
)

mock.module(
  "akasha/alan/music/catalog/modules/release-syncing/release-syncing.module.code.ts",
  () => ({
    ...syncing,
    main: (argv: readonly string[]) => {
      HANDED.push([...argv])
      return answering()
    },
  })
)

const running = await import(
  "akasha/alan/music/catalog/service-workstations/spotify-sync/spotify-sync.service-workstation.running.code.ts"
)

afterEach(() => {
  HANDED.length = 0
  answering = () => Promise.resolve(0)
  delete process.env["SPOTIFY_RATE_LIMIT_MS"]
})

test("the run is a function taking nothing, which is how the service runner calls it", () => {
  expect(typeof running.runService).toBe("function")
  expect(running.runService.length).toBe(0)
})

test("the run is the only way into this file, so the service has one entry", () => {
  expect(Object.keys(running)).toEqual(["runService"])
})

test("a run turns the syncing module's own sweep rather than a sweep written again here", async () => {
  await running.runService()
  expect(HANDED).toHaveLength(1)
})

test("a run hands the sweep the words its process was started with, so a flag reaches it", async () => {
  const was = process.argv
  process.argv = ["bun", "spotify-sync.js", "--only", "imagine-dragons"]
  try {
    await running.runService()
  } finally {
    process.argv = was
  }
  expect(HANDED).toEqual([["--only", "imagine-dragons"]])
})

test("this run paces itself at a second a call rather than at the client's default", async () => {
  await running.runService()
  expect(process.env["SPOTIFY_RATE_LIMIT_MS"]).toBe("1000")
})

test("a pace already set around this run is the pace the run keeps", async () => {
  process.env["SPOTIFY_RATE_LIMIT_MS"] = "2000"
  await running.runService()
  expect(process.env["SPOTIFY_RATE_LIMIT_MS"]).toBe("2000")
})

test("a sweep that could not run is carried out rather than swallowed", async () => {
  const why = new Error("spotify could not be reached")
  answering = () => Promise.reject(why)
  await expect(running.runService()).rejects.toThrow("spotify could not be reached")
})
