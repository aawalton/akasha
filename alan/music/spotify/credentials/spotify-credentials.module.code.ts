import { requireEnv } from "@akasha/utils-narrow/require-env"

export type SpotifyCredentials = {
  readonly clientId: string
  readonly clientSecret: string
  readonly redirectUri: string
}

export function getCredentials(): SpotifyCredentials {
  return {
    clientId: requireEnv("SPOTIFY_CLIENT_ID"),
    clientSecret: requireEnv("SPOTIFY_CLIENT_SECRET"),
    redirectUri: requireEnv("SPOTIFY_REDIRECT_URI"),
  }
}

export function basicAuthHeader(): string {
  const { clientId, clientSecret } = getCredentials()
  return `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`
}
