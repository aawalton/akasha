import { signedInAs } from "akasha/alan/harness/better-auth-rr/modules/google-auth-guard/google-auth-guard.module.code.ts"
import { safeInternalPath } from "akasha/page/url/modules/safe-target/safe-target.module.code.ts"
import { redirect } from "react-router"

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

export async function guardedRoot(
  request: Request,
  config: RouteAccessConfig
): Promise<Response | null> {
  const signed = await signedInAs(request)
  const url = new URL(request.url)
  const pathname = url.pathname
  const isAuthPath = config.authPaths.includes(pathname)

  if (signed !== null) {
    return isAuthPath ? redirect(landingAfterSignIn(url, config)) : null
  }

  if (isAuthPath || config.openPaths.some((one) => one.test(pathname))) return null

  const asked = `${pathname}${url.search}`
  return redirect(
    asked === "/" ? config.signInPath : `${config.signInPath}?next=${encodeURIComponent(asked)}`
  )
}
