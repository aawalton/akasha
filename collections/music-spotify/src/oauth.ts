import { requireEnv } from "@shared/utils-narrow/require-env"
import { z } from "zod"
import { readToken, type SpotifyToken, writeToken } from "./token-store"

const TOKEN_URL = "https://accounts.spotify.com/api/token"

const EXPIRY_BUFFER_MS = 60_000

const NOT_AUTHORIZED_ERROR =
  "spotify: no stored token — run the consent CLI first (`bun --cwd collections/music-spotify run auth`)"

export interface SpotifyCredentials {
  readonly clientId: string
  readonly clientSecret: string
  readonly redirectUri: string
}

export function getCredentials(): SpotifyCredentials {
  const clientId = requireEnv("SPOTIFY_CLIENT_ID")
  const clientSecret = requireEnv("SPOTIFY_CLIENT_SECRET")
  const redirectUri = requireEnv("SPOTIFY_REDIRECT_URI")
  return { clientId, clientSecret, redirectUri }
}

export function basicAuthHeader(): string {
  const { clientId, clientSecret } = getCredentials()
  return `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`
}

const tokenResponseSchema = z
  .object({
    access_token: z.string(),
    token_type: z.string(),
    expires_in: z.number(),
    refresh_token: z.string().optional(),
    scope: z.string().optional(),
  })
  .passthrough()

export type TokenResponse = z.infer<typeof tokenResponseSchema>

export async function parseTokenResponse(response: Response): Promise<TokenResponse> {
  if (!response.ok) {
    const body = await response.text().catch(() => "")
    throw new Error(`spotify token endpoint ${response.status}: ${body.slice(0, 300)}`)
  }
  return tokenResponseSchema.parse(await response.json())
}

function scopesFromResponse(
  scope: string | undefined,
  fallback: readonly string[]
): readonly string[] {
  if (scope == null || scope === "") return [...fallback]
  return scope.split(" ").filter((s) => s.length > 0)
}

export function persistTokenResponse(
  data: TokenResponse,
  previousRefreshToken: string | undefined,
  fallbackScopes: readonly string[]
): SpotifyToken {
  const refreshToken = data.refresh_token ?? previousRefreshToken
  if (refreshToken == null || refreshToken === "") {
    throw new Error("spotify: token response carried no refresh token and none was stored")
  }
  const token: SpotifyToken = {
    accessToken: data.access_token,
    refreshToken,
    expiresAt: new Date(Date.now() + data.expires_in * 1000).toISOString(),
    scopes: scopesFromResponse(data.scope, fallbackScopes),
  }
  writeToken(token)
  return token
}

export async function forceRefresh(): Promise<SpotifyToken> {
  const stored = readToken()
  if (stored == null) throw new Error(NOT_AUTHORIZED_ERROR)
  const response = await fetch(TOKEN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: basicAuthHeader(),
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: stored.refreshToken,
    }),
  })
  const data = await parseTokenResponse(response)
  return persistTokenResponse(data, stored.refreshToken, stored.scopes)
}

function isExpired(token: SpotifyToken): boolean {
  return new Date(token.expiresAt).getTime() - Date.now() <= EXPIRY_BUFFER_MS
}

export async function getOAuthAccessToken(): Promise<string> {
  const stored = readToken()
  if (stored == null) throw new Error(NOT_AUTHORIZED_ERROR)
  if (isExpired(stored)) {
    const refreshed = await forceRefresh()
    return refreshed.accessToken
  }
  return stored.accessToken
}
