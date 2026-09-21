import { afterAll, beforeEach, expect, mock, test } from "bun:test"
import { UNCLASSIFIED } from "akasha/command/modules/answering/command-answering.module.code.ts"

type Said = {
  readonly report: readonly string[]
  readonly refusals: readonly string[]
  readonly code: number
}

const HANDED: unknown[][] = []

const EXITED: number[] = []

const TOLD: string[] = []

let answering: () => Promise<Said> = () => Promise.resolve({ report: [], refusals: [], code: 0 })

const capturing = await import("akasha/command/pages/music/capture/music-capture.command.code.ts")

mock.module("akasha/command/pages/music/capture/music-capture.command.code.ts", () => ({
  ...capturing,
  musicCapture: (argv: readonly string[]) => {
    HANDED.push([...argv])
    return answering()
  },
}))

const running = await import(
  "akasha/alan/music/listening/service-workstations/music-capture/music-capture.service-workstation.running.code.ts"
)

const exiting = process.exit

const writing = process.stdout.write

beforeEach(() => {
  HANDED.length = 0
  EXITED.length = 0
  TOLD.length = 0
  answering = () => Promise.resolve({ report: [], refusals: [], code: 0 })
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

test("a run turns the capture command's own sweep rather than a sweep written again here", async () => {
  await running.runService()
  expect(HANDED).toEqual([[]])
})

test("a run the command answered leaves the process alone", async () => {
  await running.runService()
  expect(EXITED).toEqual([])
})

test("what the command answered is what the run says", async () => {
  answering = () => Promise.resolve({ report: ["recorded\t3"], refusals: [], code: 0 })
  await running.runService()
  expect(TOLD).toEqual(["recorded\t3\n"])
})

test("a run the command refused leaves on the code the command answered with", async () => {
  answering = () =>
    Promise.resolve({
      report: [],
      refusals: ["spotify could not be reached"],
      code: UNCLASSIFIED,
    })
  await running.runService()
  expect(EXITED).toEqual([UNCLASSIFIED])
})

test("a capture that could not run is carried out rather than swallowed", async () => {
  const why = new Error("spotify could not be reached")
  answering = () => Promise.reject(why)
  await expect(running.runService()).rejects.toThrow("spotify could not be reached")
})
