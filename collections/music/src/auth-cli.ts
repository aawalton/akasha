import crypto from "node:crypto"
import { z } from "zod"
import { basicAuthHeader, getCredentials, saveTokenToDb } from "./auth"

const SCOPES = "playlist-modify-public playlist-modify-private"
const TOKEN_URL = "https://accounts.spotify.com/api/token"
const AUTHORIZE_URL = "https://accounts.spotify.com/authorize"
const PORT = 8888

const tokenResponseSchema = z.object({
  access_token: z.string(),
  refresh_token: z.string(),
  expires_in: z.number(),
  scope: z.string(),
})

function getRedirectUri(): string {
  return z
    .string()
    .default(`http://localhost:${PORT}/callback`)
    .parse(process.env.SPOTIFY_REDIRECT_URI)
}

async function exchangeCodeForTokens(
  code: string,
  redirectUri: string
): Promise<{ accessToken: string; refreshToken: string; expiresIn: number; scope: string }> {
  const response = await fetch(TOKEN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: basicAuthHeader(),
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: redirectUri,
    }),
  })

  if (!response.ok) {
    const text = await response.text()
    throw new Error(`Token exchange failed: ${response.status} ${text}`)
  }

  const data = tokenResponseSchema.parse(await response.json())
  return {
    accessToken: data.access_token,
    refreshToken: data.refresh_token,
    expiresIn: data.expires_in,
    scope: data.scope,
  }
}

async function main() {
  const { clientId } = getCredentials()
  const redirectUri = getRedirectUri()

  const codeArgIndex = process.argv.indexOf("--code")
  const providedCode = codeArgIndex === -1 ? undefined : process.argv[codeArgIndex + 1]
  if (providedCode != null) {
    console.log("Exchanging provided code for tokens...")
    const tokens = await exchangeCodeForTokens(providedCode, redirectUri)
    const expiresAt = new Date(Date.now() + tokens.expiresIn * 1000)
    await saveTokenToDb(
      tokens.accessToken,
      tokens.refreshToken,
      expiresAt,
      tokens.scope !== "" ? tokens.scope.split(" ") : null
    )
    console.log("Spotify OAuth tokens saved successfully.")
    process.exit(0)
  }

  const state = crypto.randomBytes(16).toString("hex")

  const authorizeUrl = new URL(AUTHORIZE_URL)
  authorizeUrl.searchParams.set("client_id", clientId)
  authorizeUrl.searchParams.set("response_type", "code")
  authorizeUrl.searchParams.set("redirect_uri", redirectUri)
  authorizeUrl.searchParams.set("scope", SCOPES)
  authorizeUrl.searchParams.set("state", state)

  console.log("Open this URL in your browser to authorize Spotify:\n")
  console.log(authorizeUrl.toString())
  console.log("\nWaiting for callback on localhost...")
  console.log(
    "(If localhost is unavailable, use --code <code> with the code from the callback page)\n"
  )

  const code = await new Promise<string>((resolve, reject) => {
    const server = Bun.serve({
      port: PORT,
      fetch(req) {
        const url = new URL(req.url)
        if (url.pathname !== "/callback") {
          return new Response("Not found", { status: 404 })
        }

        const error = url.searchParams.get("error")
        if (error != null) {
          reject(new Error(`Authorization denied: ${error}`))
          setTimeout(() => server.stop(), 100)
          return new Response("Authorization denied. You can close this tab.")
        }

        const returnedState = url.searchParams.get("state")
        if (returnedState !== state) {
          reject(new Error("State mismatch — possible CSRF attack"))
          setTimeout(() => server.stop(), 100)
          return new Response("Authorization failed: state mismatch. You can close this tab.")
        }

        const authCode = url.searchParams.get("code")
        if (authCode == null) {
          reject(new Error("No authorization code in callback"))
          setTimeout(() => server.stop(), 100)
          return new Response("Missing authorization code. You can close this tab.")
        }

        resolve(authCode)
        setTimeout(() => server.stop(), 100)
        return new Response("Authorization successful! You can close this tab.")
      },
    })
  })

  console.log("Exchanging code for tokens...")
  const tokens = await exchangeCodeForTokens(code, redirectUri)
  const expiresAt = new Date(Date.now() + tokens.expiresIn * 1000)

  await saveTokenToDb(
    tokens.accessToken,
    tokens.refreshToken,
    expiresAt,
    tokens.scope !== "" ? tokens.scope.split(" ") : null
  )

  console.log("Spotify OAuth tokens saved successfully.")
  process.exit(0)
}

main().catch((error) => {
  console.error("Spotify auth failed:", error)
  process.exit(1)
})
