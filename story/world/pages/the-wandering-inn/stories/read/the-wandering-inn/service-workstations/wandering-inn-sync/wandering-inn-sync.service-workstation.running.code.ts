import { main } from "akasha/story/world/pages/the-wandering-inn/stories/read/the-wandering-inn/modules/syncing/syncing.module.code.ts"

export async function runService(): Promise<void> {
  const code = await main([])
  if (code !== 0) process.exit(code)
}
