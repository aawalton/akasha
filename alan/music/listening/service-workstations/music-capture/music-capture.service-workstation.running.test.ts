import { afterAll, beforeEach, expect, mock, test } from "bun:test"
import { UNCLASSIFIED } from "akasha/command/modules/answering/command-answering.module.code.ts"

type Said = {
  readonly report: readonly string[]
  readonly refusals: readonly string[]
  readonly code: number
}

const DONE: Said = { report: [], refusals: [], code: 0 }

const CAPTURE = "capture"

const HEARD_TRACKS = "heard-tracks"

const RELEASE_PARTS = "release-parts"

const EVERY_STEP = [CAPTURE, HEARD_TRACKS, RELEASE_PARTS]

const CALLED: string[] = []

const EXITED: number[] = []

const TOLD: string[] = []

const answering = new Map<string, () => Promise<Said>>()

function stub(named: string): () => Promise<Said> {
  return () => {
    CALLED.push(named)
    return (answering.get(named) ?? (() => Promise.resolve(DONE)))()
  }
}

const captured = await import("akasha/command/pages/music/capture/music-capture.command.code.ts")

const marked = await import(
  "akasha/command/pages/music/heard-tracks/music-heard-tracks.command.code.ts"
)

const rolled = await import(
  "akasha/command/pages/music/release-parts/music-release-parts.command.code.ts"
)

mock.module("akasha/command/pages/music/capture/music-capture.command.code.ts", () => ({
  ...captured,
  musicCapture: stub(CAPTURE),
}))

mock.module("akasha/command/pages/music/heard-tracks/music-heard-tracks.command.code.ts", () => ({
  ...marked,
  musicHeardTracks: stub(HEARD_TRACKS),
}))

mock.module("akasha/command/pages/music/release-parts/music-release-parts.command.code.ts", () => ({
  ...rolled,
  musicReleaseParts: stub(RELEASE_PARTS),
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
  answering.clear()
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

test("a run files the plays, carries each onto its track, then clears the releases covered", async () => {
  await running.runService()
  expect(CALLED).toEqual(EVERY_STEP)
})

test("a run every step answered leaves the process alone", async () => {
  await running.runService()
  expect(EXITED).toEqual([])
})

test("what each step answered is what the run says", async () => {
  answering.set(CAPTURE, () => Promise.resolve({ ...DONE, report: ["recorded\t3"] }))
  answering.set(HEARD_TRACKS, () => Promise.resolve({ ...DONE, report: ["heard\t9"] }))
  answering.set(RELEASE_PARTS, () => Promise.resolve({ ...DONE, report: ["covered\t8"] }))
  await running.runService()
  expect(TOLD).toEqual(["recorded\t3\n", "heard\t9\n", "covered\t8\n"])
})

test("a step that refused leaves before the step behind it runs", async () => {
  answering.set(CAPTURE, () =>
    Promise.resolve({ report: [], refusals: ["spotify could not be reached"], code: UNCLASSIFIED })
  )
  await running.runService()
  expect(CALLED).toEqual([CAPTURE])
  expect(EXITED).toEqual([UNCLASSIFIED])
})

test("a later step that refused leaves on the code that step answered with", async () => {
  answering.set(HEARD_TRACKS, () =>
    Promise.resolve({ report: [], refusals: ["no heard music page is filed"], code: UNCLASSIFIED })
  )
  await running.runService()
  expect(CALLED).toEqual([CAPTURE, HEARD_TRACKS])
  expect(EXITED).toEqual([UNCLASSIFIED])
})

test("a step that could not run is carried out rather than swallowed", async () => {
  answering.set(CAPTURE, () => Promise.reject(new Error("spotify could not be reached")))
  await expect(running.runService()).rejects.toThrow("spotify could not be reached")
})
