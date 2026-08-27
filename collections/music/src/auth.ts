import { requireEnv } from "@shared/utils-narrow/require-env"

const DISABLED_ERROR =
  "spotify OAuth is disabled: the shared credential store was decommissioned; music/auth.ts needs its own storage before this can work again"

export function getCredentials(): { clientId: string; clientSecret: string } {
  const clientId = requireEnv("SPOTIFY_CLIENT_ID")
  const clientSecret = requireEnv("SPOTIFY_CLIENT_SECRET")
  return { clientId, clientSecret }
}

export function basicAuthHeader(): string {
  const { clientId, clientSecret } = getCredentials()
  return `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`
}

export async function saveTokenToDb(
  _accessToken: string,
  _refreshToken: string,
  _expiresAt: Date,
  _scopes: readonly string[] | null
): Promise<void> {
  throw new Error(DISABLED_ERROR)
}

export async function getOAuthAccessToken(): Promise<string> {
  throw new Error(DISABLED_ERROR)
}

export function clearTokenCache(): undefined {}
