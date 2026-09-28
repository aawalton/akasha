import { watchCoverRerolls } from "akasha/story/world/stories/played/modules/cover-rerolling/cover-rerolling.module.code.ts"

const NEVER: Promise<never> = new Promise(() => {})

export async function runService(): Promise<never> {
  watchCoverRerolls()
  return await NEVER
}
