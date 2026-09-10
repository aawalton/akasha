import { optionalEnv, requireEnv } from "akasha/utils/narrow/require-env/require-env.module.code.ts"

export const SHARED_TOKEN_VAR = "GOOGLE_OAUTH_REFRESH_TOKEN"

export function readGoogleRefreshToken(ownVar: string): string {
  const shared = optionalEnv(SHARED_TOKEN_VAR)
  if (shared !== undefined) return shared
  return requireEnv(ownVar)
}
