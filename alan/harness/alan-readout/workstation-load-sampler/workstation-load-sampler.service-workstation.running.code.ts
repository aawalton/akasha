import { sampleLoad } from "akasha/alan/harness/alan-readout/modules/workstation-load-sampling/workstation-load-sampling.module.code.ts"

export async function runService(): Promise<never> {
  const ending = Promise.withResolvers<never>()
  sampleLoad((thrown: unknown): undefined => {
    ending.reject(thrown)
    return undefined
  })
  return await ending.promise
}
