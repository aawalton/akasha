import { requireEnv } from "akasha/utils/narrow/require-env/require-env.module.code.ts"

export const SHARED_TOKEN_VAR = "GOOGLE_OAUTH_REFRESH_TOKEN"

export function readGoogleRefreshToken(ownVar: string): string {
  const shared = process.env[SHARED_TOKEN_VAR]
  if (shared !== undefined && shared !== "") return shared
  return requireEnv(ownVar)
}
