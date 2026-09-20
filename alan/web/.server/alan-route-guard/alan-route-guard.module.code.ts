import { signedInAs } from "akasha/alan/harness/better-auth-rr/modules/google-auth-guard/google-auth-guard.module.code.ts"
import { safeInternalPath } from "akasha/page/url/modules/safe-target/safe-target.module.code.ts"
import { data, redirect } from "react-router"

export type RouteAccessConfig = {
  readonly signInPath: string
  readonly authPaths: readonly string[]
  readonly openPaths: readonly RegExp[]
  readonly externalRedirectPattern?: RegExp
}

function landingAfterSignIn(url: URL, config: RouteAccessConfig): string {
  const next = url.searchParams.get("next")
  if (next === null) return "/"
  if (config.externalRedirectPattern?.test(next) === true) return next
  return safeInternalPath(next) === null ? "/" : next
}

export async function guardedRoot<Nonce>(
  request: Request,
  config: RouteAccessConfig,
  nonce: Nonce
): Promise<Response | ReturnType<typeof data<{ nonce: Nonce }>>> {
  const signed = await signedInAs(request)
  const url = new URL(request.url)
  const pathname = url.pathname
  const isAuthPath = config.authPaths.includes(pathname)

  if (signed !== null) {
    return isAuthPath ? redirect(landingAfterSignIn(url, config)) : data({ nonce })
  }

  if (isAuthPath || config.openPaths.some((one) => one.test(pathname))) return data({ nonce })

  const asked = `${pathname}${url.search}`
  return redirect(
    asked === "/" ? config.signInPath : `${config.signInPath}?next=${encodeURIComponent(asked)}`
  )
}
