import { main } from "akasha/story/world/stories/read/wandering-inn/modules/syncing/syncing.module.code.ts"

export async function runService(): Promise<void> {
  const code = await main([])
  if (code !== 0) process.exit(code)
}
