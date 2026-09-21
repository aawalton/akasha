import { afterAll, beforeEach, expect, mock, test } from "bun:test"
import { UNCLASSIFIED } from "akasha/command/modules/answering/command-answering.module.code.ts"

type Said = {
  readonly report: readonly string[]
  readonly refusals: readonly string[]
  readonly code: number
}

const DONE: Said = { report: [], refusals: [], code: 0 }

const CALLED: string[] = []

const EXITED: number[] = []

const TOLD: string[] = []

let capturing: () => Promise<Said> = () => Promise.resolve(DONE)

let marking: () => Promise<Said> = () => Promise.resolve(DONE)

const captured = await import("akasha/command/pages/music/capture/music-capture.command.code.ts")

const marked = await import(
  "akasha/command/pages/music/heard-tracks/music-heard-tracks.command.code.ts"
)

mock.module("akasha/command/pages/music/capture/music-capture.command.code.ts", () => ({
  ...captured,
  musicCapture: () => {
    CALLED.push("capture")
    return capturing()
  },
}))

mock.module("akasha/command/pages/music/heard-tracks/music-heard-tracks.command.code.ts", () => ({
  ...marked,
  musicHeardTracks: () => {
    CALLED.push("heard-tracks")
    return marking()
  },
}))

const running = await import(
  "akasha/alan/music/listening/service-workstations/music-capture/music-capture.service-workstation.running.code.ts"
)

const exiting = process.exit

const writing = process.stdout.write

beforeEach(() => {
  CALLED.length = 0
  EXITED.length = 0
  TOLD.length = 0
  capturing = () => Promise.resolve(DONE)
  marking = () => Promise.resolve(DONE)
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

test("a run files the plays and then carries each onto the track played", async () => {
  await running.runService()
  expect(CALLED).toEqual(["capture", "heard-tracks"])
})

test("a run both commands answered leaves the process alone", async () => {
  await running.runService()
  expect(EXITED).toEqual([])
})

test("what each command answered is what the run says", async () => {
  capturing = () => Promise.resolve({ report: ["recorded\t3"], refusals: [], code: 0 })
  marking = () => Promise.resolve({ report: ["heard\t9"], refusals: [], code: 0 })
  await running.runService()
  expect(TOLD).toEqual(["recorded\t3\n", "heard\t9\n"])
})

test("a capture that refused leaves before a track is carried anything", async () => {
  capturing = () =>
    Promise.resolve({ report: [], refusals: ["spotify could not be reached"], code: UNCLASSIFIED })
  await running.runService()
  expect(CALLED).toEqual(["capture"])
  expect(EXITED).toEqual([UNCLASSIFIED])
})

test("a marking that refused leaves on the code that command answered with", async () => {
  marking = () =>
    Promise.resolve({ report: [], refusals: ["no heard music page is filed"], code: UNCLASSIFIED })
  await running.runService()
  expect(CALLED).toEqual(["capture", "heard-tracks"])
  expect(EXITED).toEqual([UNCLASSIFIED])
})

test("a capture that could not run is carried out rather than swallowed", async () => {
  capturing = () => Promise.reject(new Error("spotify could not be reached"))
  await expect(running.runService()).rejects.toThrow("spotify could not be reached")
})
