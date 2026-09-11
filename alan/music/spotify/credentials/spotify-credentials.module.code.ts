import { requireEnv } from "akasha/utils/narrow/require-env/require-env.module.code.ts"

export type SpotifyCredentials = {
  readonly clientId: string
  readonly clientSecret: string
  readonly redirectUri: string
}

export type SpotifyClientCredentials = {
  readonly clientId: string
  readonly clientSecret: string
}

export function getClientCredentials(): SpotifyClientCredentials {
  return {
    clientId: requireEnv("SPOTIFY_CLIENT_ID"),
    clientSecret: requireEnv("SPOTIFY_CLIENT_SECRET"),
  }
}

export function getCredentials(): SpotifyCredentials {
  return { ...getClientCredentials(), redirectUri: requireEnv("SPOTIFY_REDIRECT_URI") }
}

export function basicAuthHeader(): string {
  const { clientId, clientSecret } = getClientCredentials()
  return `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`
}
