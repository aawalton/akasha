import type { OAuthCredential } from "../oauth-types/oauth-types.module.code.ts"

export type AuthFailedRetryOutcome =
  | { kind: "response"; response: Response }
  | { kind: "retry"; credential: OAuthCredential }

export type AuthFailedRetryArgs = {
  res: Response
  currentAccount: string
  currentToken: string
  trail: readonly string[]
  method: string
  pathname: string
  logPrefix: string
  getFreshToken: (account: string) => Promise<OAuthCredential | null>
}

export async function attemptAuthFailedRetry(
  args: AuthFailedRetryArgs
): Promise<AuthFailedRetryOutcome> {
  const { res, currentAccount, currentToken, trail, method, pathname, logPrefix, getFreshToken } =
    args
  const responseHeaders = res.headers
  const responseStatusText = res.statusText
  const bodyText = await res.text()

  const terminal = (why: string): AuthFailedRetryOutcome => {
    console.error(
      `${logPrefix} upstream-terminal-error ${method} ${pathname} account=${trail.join("→")} status=401 reread=${why}`
    )
    return {
      kind: "response",
      response: new Response(bodyText, {
        status: 401,
        statusText: responseStatusText,
        headers: responseHeaders,
      }),
    }
  }

  const fresh = await getFreshToken(currentAccount)
  if (fresh == null) return terminal("no-fresh-token")
  if (fresh.accessToken === currentToken) return terminal("same-token")

  console.log(
    `${logPrefix} 401 observed account=${currentAccount}; the store holds a newer credential, replaying the same account on it`
  )
  return { kind: "retry", credential: fresh }
}
