import {
  sayOnTheConsole,
  watchDayReadings,
} from "akasha/alan/harness/alan-readouts/day-readout-watching/day-readout-watching.module.code.ts"

export async function runService(): Promise<never> {
  const ending = Promise.withResolvers<never>()
  watchDayReadings(sayOnTheConsole, (thrown: unknown): undefined => {
    ending.reject(thrown)
    return undefined
  })
  return await ending.promise
}
