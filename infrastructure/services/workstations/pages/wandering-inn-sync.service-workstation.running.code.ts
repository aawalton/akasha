import { main } from "akasha/story/wandering-inn/syncing/syncing.module.code.ts"

export async function runService(): Promise<void> {
  const code = await main([])
  if (code !== 0) process.exit(code)
}
