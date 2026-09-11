import { expect, mock, test } from "bun:test"

const RAN: string[] = []

let handed: unknown = null
let ends: (thrown: unknown) => undefined = (): undefined => undefined

const watching = await import(
  "akasha/alan/harness/alan-readouts/day-readout-watching/day-readout-watching.module.code.ts"
)

mock.module(
  "akasha/alan/harness/alan-readouts/day-readout-watching/day-readout-watching.module.code.ts",
  () => ({
    ...watching,
    watchDayReadings: (said: unknown, ended: (thrown: unknown) => undefined): (() => undefined) => {
      RAN.push("watch")
      handed = said
      ends = ended
      return (): undefined => undefined
    },
  })
)

const running = await import(
  "akasha/alan/harness/alan-readouts/day-readout-watch-service/day-readout-watch-service.service-workstation.running.code.ts"
)

async function answeredWithin(run: Promise<never>, ms: number): Promise<boolean> {
  let answered = false
  const noted = (): undefined => {
    answered = true
    return undefined
  }
  await Promise.race([run.then(noted, noted), Bun.sleep(ms)])
  return answered
}

test("the run is a function taking nothing, which is how the service runner calls it", () => {
  expect(typeof running.runService).toBe("function")
  expect(running.runService.length).toBe(0)
})

test("the run is the only way into this file, so the service has one entry", () => {
  expect(Object.keys(running)).toEqual(["runService"])
})

test("a run starts the watching module's own watch rather than a watch written again here", async () => {
  RAN.length = 0
  await expect(answeredWithin(running.runService(), 25)).resolves.toBe(false)
  expect(RAN).toEqual(["watch"])
})

test("a run says what it took through the watching module's own console logger", async () => {
  await expect(answeredWithin(running.runService(), 25)).resolves.toBe(false)
  expect(handed).toBe(watching.sayOnTheConsole)
})

test("a run does not answer while the watch is up, so the runner's process stays the service", async () => {
  await expect(answeredWithin(running.runService(), 100)).resolves.toBe(false)
})

test("a watch that ends carries out what ended it, so the unit fails rather than running on", async () => {
  const run = running.runService()
  ends(new Error("the day's folder stopped being followed"))
  await expect(run).rejects.toThrow("the day's folder stopped being followed")
})

test("a watch that could not start is carried out rather than swallowed, so a failed start is a failed unit", async () => {
  mock.module(
    "akasha/alan/harness/alan-readouts/day-readout-watching/day-readout-watching.module.code.ts",
    () => ({
      ...watching,
      watchDayReadings: (): (() => undefined) => {
        throw new Error("the day's readouts could not be watched")
      },
    })
  )
  await expect(running.runService()).rejects.toThrow("the day's readouts could not be watched")
})
