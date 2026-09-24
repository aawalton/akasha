import { main } from "akasha/alan/music/catalog/modules/release-syncing/release-syncing.module.code.ts"

const PACE_MS = "1000"

export async function runService(): Promise<void> {
  process.env["SPOTIFY_RATE_LIMIT_MS"] ??= PACE_MS
  const code = await main(process.argv.slice(2))
  if (code !== 0) process.exit(code)
}
