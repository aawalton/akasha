import { watchTurnUndos } from "akasha/story/world/stories/played/modules/turn-undo-answering/turn-undo-answering.module.code.ts"

const NEVER: Promise<never> = new Promise(() => {})

export async function runService(): Promise<never> {
  watchTurnUndos()
  return await NEVER
}
