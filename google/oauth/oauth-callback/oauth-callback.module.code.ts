import { InputError } from "@akasha/errors-core/exit-code"

export interface OauthCallback {
  readonly redirectUri: string
  readonly code: string
}

export function parseOauthCallbackUrl(raw: string): OauthCallback {
  const trimmed = raw.trim().replace(/^['"]|['"]$/g, "")
  let url: URL
  try {
    url = new URL(trimmed)
  } catch {
    throw new InputError(`--callback-url is not a valid URL: ${raw}`)
  }
  const error = url.searchParams.get("error")
  if (error !== null) throw new InputError(`consent was not granted: ${error}`)
  const code = url.searchParams.get("code")
  if (code === null || code === "")
    throw new InputError(
      "--callback-url has no authorization code — paste the full callback URL from the browser address bar"
    )
  return { redirectUri: `${url.protocol}//${url.host}${url.pathname}`, code }
}
