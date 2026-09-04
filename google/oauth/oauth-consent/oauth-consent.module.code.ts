import { OperationalError } from "@akasha/errors-core/exit-code"
import { parseOauthCallbackUrl } from "../oauth-callback/oauth-callback.module.code.ts"

const AUTH_URL = "https://accounts.google.com/o/oauth2/v2/auth"
const TOKEN_URL = "https://oauth2.googleapis.com/token"

export interface ConsentRequest {
  readonly scopes: readonly string[]
  readonly clientId: string
  readonly clientSecret: string
  readonly tokenVar: string
  readonly callbackUrl: string | undefined
}

interface CodeSettlers {
  readonly resolve: (code: string) => void
  readonly reject: (error: Error) => void
}

function consentUrl(request: ConsentRequest, redirectUri: string): string {
  const query = new URLSearchParams({
    client_id: request.clientId,
    redirect_uri: redirectUri,
    response_type: "code",
    access_type: "offline",
    prompt: "consent",
    scope: request.scopes.join(" "),
  })
  return `${AUTH_URL}?${query.toString()}`
}

async function refreshTokenLine(
  request: ConsentRequest,
  redirectUri: string,
  code: string
): Promise<string> {
  const body = new URLSearchParams({
    code,
    client_id: request.clientId,
    client_secret: request.clientSecret,
    redirect_uri: redirectUri,
    grant_type: "authorization_code",
  })
  const res = await fetch(TOKEN_URL, { method: "POST", body })
  if (!res.ok)
    throw new OperationalError(
      `token exchange: HTTP ${res.status} ${(await res.text()).slice(0, 200)}`
    )
  const json = (await res.json()) as { refresh_token?: unknown }
  const refreshToken = json.refresh_token
  if (typeof refreshToken !== "string")
    throw new OperationalError(
      "token exchange succeeded but returned no refresh token — revoke the app's access and re-run with prompt=consent"
    )
  return `export ${request.tokenVar}=${refreshToken}`
}

async function exchangeFromCallbackUrl(
  request: ConsentRequest,
  rawUrl: string
): Promise<readonly string[]> {
  const { redirectUri, code } = parseOauthCallbackUrl(rawUrl)
  return [await refreshTokenLine(request, redirectUri, code)]
}

async function consentViaLoopback(request: ConsentRequest): Promise<readonly string[]> {
  let settlers: CodeSettlers | undefined
  const codePromise = new Promise<string>((resolve, reject) => {
    settlers = { resolve, reject }
  })

  const server = Bun.serve({
    hostname: "127.0.0.1",
    port: 0,
    fetch(req) {
      const url = new URL(req.url)
      const error = url.searchParams.get("error")
      if (error !== null) {
        settlers?.reject(new OperationalError(`consent was not granted: ${error}`))
        return new Response("Consent failed. You can close this tab.", { status: 400 })
      }
      const code = url.searchParams.get("code")
      if (code === null) return new Response("Missing authorization code.", { status: 400 })
      settlers?.resolve(code)
      return new Response("Consent received. You can close this tab.")
    },
  })

  try {
    const redirectUri = `http://127.0.0.1:${server.port}/callback`
    process.stderr.write(
      `Open this URL in a browser and complete consent:\n\n${consentUrl(request, redirectUri)}\n\n`
    )
    process.stderr.write(
      `Waiting for the redirect on ${redirectUri} ... ` +
        `(if your browser can't reach it, re-run with --callback-url '<pasted-url>')\n`
    )

    const code = await codePromise
    return [await refreshTokenLine(request, redirectUri, code)]
  } finally {
    server.stop()
  }
}

export async function googleOauthConsentSaying(
  request: ConsentRequest
): Promise<readonly string[]> {
  if (request.callbackUrl !== undefined) {
    return exchangeFromCallbackUrl(request, request.callbackUrl)
  }
  return consentViaLoopback(request)
}

export async function googleOauthConsent(request: ConsentRequest): Promise<void> {
  for (const said of await googleOauthConsentSaying(request)) process.stdout.write(`${said}\n`)
}
