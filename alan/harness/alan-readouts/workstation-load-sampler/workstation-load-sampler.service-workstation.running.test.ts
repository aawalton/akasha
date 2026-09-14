import { expect, mock, test } from "bun:test"

const STILL_RUNNING = "still running"
const ANSWERED = "answered"
const RAN: string[] = []

let ends: (thrown: unknown) => undefined = (): undefined => undefined

const sampling = await import(
  "akasha/alan/harness/alan-readouts/modules/workstation-load-sampling/workstation-load-sampling.module.code.ts"
)

mock.module(
  "akasha/alan/harness/alan-readouts/modules/workstation-load-sampling/workstation-load-sampling.module.code.ts",
  () => ({
    ...sampling,
    sampleLoad: (ended: (thrown: unknown) => undefined): (() => undefined) => {
      RAN.push("sample")
      ends = ended
      return (): undefined => undefined
    },
  })
)

const running = await import(
  "akasha/alan/harness/alan-readouts/workstation-load-sampler/workstation-load-sampler.service-workstation.running.code.ts"
)

function afterWaiting(run: Promise<never>, ms: number): Promise<string> {
  const settled = run.then(
    () => ANSWERED,
    () => ANSWERED
  )
  const waited = Bun.sleep(ms).then(() => STILL_RUNNING)
  return Promise.race([settled, waited])
}

test("the run is a function taking nothing, which is how the service runner calls it", () => {
  expect(typeof running.runService).toBe("function")
  expect(running.runService.length).toBe(0)
})

test("the run is the only way into this file, so the service has one entry", () => {
  expect(Object.keys(running)).toEqual(["runService"])
})

test("a run starts the sampling module's own loop rather than a loop written again here", async () => {
  RAN.length = 0
  await expect(afterWaiting(running.runService(), 25)).resolves.toBe(STILL_RUNNING)
  expect(RAN).toEqual(["sample"])
})

test("a run does not answer while the loop is up, so the runner's process stays the service", async () => {
  await expect(afterWaiting(running.runService(), 100)).resolves.toBe(STILL_RUNNING)
})

test("a loop that ends carries out what ended it, so the unit fails rather than running on", async () => {
  const run = running.runService()
  ends(new Error("the kernel's counters could not be read"))
  await expect(run).rejects.toThrow("the kernel's counters could not be read")
})

test("a loop that could not start is carried out rather than swallowed, so a failed start is a failed unit", async () => {
  mock.module(
    "akasha/alan/harness/alan-readouts/modules/workstation-load-sampling/workstation-load-sampling.module.code.ts",
    () => ({
      ...sampling,
      sampleLoad: (): (() => undefined) => {
        throw new Error("no readout is there to keep a reading beside")
      },
    })
  )
  await expect(running.runService()).rejects.toThrow("no readout is there to keep a reading beside")
})
