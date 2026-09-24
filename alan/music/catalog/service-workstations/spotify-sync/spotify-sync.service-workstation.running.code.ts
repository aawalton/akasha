import { main } from "akasha/alan/music/catalog/modules/release-syncing/release-syncing.module.code.ts"
import { optionalEnv } from "akasha/code/type/narrowing/modules/require-env/require-env.module.code.ts"

const PACE = "SPOTIFY_RATE_LIMIT_MS"

const PACE_MS = "1000"

export async function runService(): Promise<void> {
  if (optionalEnv(PACE) === undefined) process.env[PACE] = PACE_MS
  const code = await main(process.argv.slice(2))
  if (code !== 0) process.exit(code)
}
