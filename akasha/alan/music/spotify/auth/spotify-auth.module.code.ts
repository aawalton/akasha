import { z } from "zod"
import { basicAuthHeader } from "../credentials/spotify-credentials.module.code.ts"
import { fetchSpotify } from "../fetching/spotify-fetching.module.code.ts"
import {
  readToken,
  type SpotifyToken,
  writeToken,
} from "../token-store/spotify-token-store.module.code.ts"

export const TOKEN_URL = "https://accounts.spotify.com/api/token"

const EXPIRY_BUFFER_MS = 60_000

const NOT_AUTHORIZED =
  "spotify: no token is stored — give consent first with `bun run akasha/alan/music/spotify/auth-cli/spotify-auth-cli.module.code.ts`"

export const tokenResponseSchema = z
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

export function scopesFromResponse(
  scope: string | undefined,
  fallback: readonly string[]
): readonly string[] {
  if (scope == null || scope === "") return [...fallback]
  return scope.split(" ").filter((one) => one.length > 0)
}

export function persistTokenResponse(
  data: TokenResponse,
  previousRefreshToken: string | undefined,
  fallbackScopes: readonly string[]
): SpotifyToken {
  const refreshToken = data.refresh_token ?? previousRefreshToken
  if (refreshToken == null || refreshToken === "") {
    throw new Error("spotify: the token answer carried no refresh token and none was stored")
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

export function isExpired(token: SpotifyToken, now: number = Date.now()): boolean {
  return new Date(token.expiresAt).getTime() - now <= EXPIRY_BUFFER_MS
}

export async function forceRefresh(): Promise<SpotifyToken> {
  const stored = readToken()
  if (stored == null) throw new Error(NOT_AUTHORIZED)
  const response = await fetchSpotify(TOKEN_URL, {
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

export async function getOAuthAccessToken(): Promise<string> {
  const stored = readToken()
  if (stored == null) throw new Error(NOT_AUTHORIZED)
  if (!isExpired(stored)) return stored.accessToken
  const refreshed = await forceRefresh()
  return refreshed.accessToken
}
