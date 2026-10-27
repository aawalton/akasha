import { afterAll, beforeEach, expect, mock, test } from "bun:test"
import { UNCLASSIFIED } from "akasha/command/modules/answering/command-answering.module.code.ts"

type Said = {
  readonly report: readonly string[]
  readonly refusals: readonly string[]
  readonly code: number
}

const DONE: Said = { report: [], refusals: [], code: 0 }

const HANDED: unknown[][] = []

const EXITED: number[] = []

const TOLD: string[] = []

let answering: () => Promise<Said> = () => Promise.resolve(DONE)

const kept = await import(
  "akasha/command/pages/music/unheard-playlist/music-unheard-playlist.command.code.ts"
)

mock.module(
  "akasha/command/pages/music/unheard-playlist/music-unheard-playlist.command.code.ts",
  () => ({
    ...kept,
    musicUnheardPlaylist: (argv: readonly string[], given: unknown) => {
      HANDED.push([argv, given])
      return answering()
    },
  })
)

const running = await import(
  "akasha/alan/music/choosing/service-workstations/unheard-playlist/unheard-playlist.service-workstation.running.code.ts"
)

const exiting = process.exit

const writing = process.stdout.write

beforeEach(() => {
  HANDED.length = 0
  EXITED.length = 0
  TOLD.length = 0
  answering = () => Promise.resolve(DONE)
  process.exit = ((code?: number) => {
    EXITED.push(code ?? 0)
  }) as typeof process.exit
  process.stdout.write = ((text: string) => {
    TOLD.push(text)
    return true
  }) as typeof process.stdout.write
})

afterAll(() => {
  process.exit = exiting
  process.stdout.write = writing
})

test("the run is a function taking nothing, which is how the service runner calls it", () => {
  expect(typeof running.runService).toBe("function")
  expect(running.runService.length).toBe(0)
})

test("the run is the only way into this file, so the service has one entry", () => {
  expect(Object.keys(running)).toEqual(["runService"])
})

test("a run calls the unheard-playlist command once with no flag", async () => {
  await running.runService()
  expect(HANDED).toHaveLength(1)
  expect(HANDED[0]?.[0]).toEqual([])
  expect(HANDED[0]?.[1]).toMatchObject({ calledAs: "akasha music unheard-playlist" })
})

test("a run the command answered leaves the process alone", async () => {
  await running.runService()
  expect(EXITED).toEqual([])
})

test("what the command answered is what the run says", async () => {
  answering = () => Promise.resolve({ ...DONE, report: ["added\t3", "removed\t1"] })
  await running.runService()
  expect(TOLD).toEqual(["added\t3\n", "removed\t1\n"])
})

test("a refusal leaves on the code the command answered with", async () => {
  answering = () =>
    Promise.resolve({ report: [], refusals: ["no playlist is named"], code: UNCLASSIFIED })
  await running.runService()
  expect(TOLD).toEqual(["no playlist is named\n"])
  expect(EXITED).toEqual([UNCLASSIFIED])
})

test("a command that could not run is carried out rather than swallowed", async () => {
  answering = () => Promise.reject(new Error("spotify could not be reached"))
  await expect(running.runService()).rejects.toThrow("spotify could not be reached")
})
