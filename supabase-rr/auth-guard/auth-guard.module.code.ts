import { safeInternalPath } from "@akasha/pages-url/safe-target"
import { redirect } from "react-router"
import { isEffectivelyAuthenticated } from "../effective-auth/effective-auth.module.code.ts"
import { hasSessionCookie } from "../session-cookie/session-cookie.module.code.ts"
import { refreshSession } from "../session-refresh/session-refresh.module.code.ts"

export type AuthRouteConfig = {
  signInPath: string
  authPaths: readonly string[]
  internalApiPaths: readonly (string | RegExp)[]
  externalRedirectPattern?: RegExp
  requireAuth?: boolean
  rootRedirects?: {
    authenticated?: string
    unauthenticated?: string
  }
  signInOnInvalidSession?: boolean
}

export type AuthGuardPass = {
  kind: "pass"
  headers: Headers
}

function matchesInternal(pathname: string, matchers: readonly (string | RegExp)[]): boolean {
  for (const matcher of matchers) {
    if (typeof matcher === "string") {
      if (pathname === matcher || pathname.startsWith(matcher)) return true
    } else if (matcher.test(pathname)) {
      return true
    }
  }
  return false
}

function isSafeInternalPath(value: string | null): value is string {
  if (value == null) return false
  return safeInternalPath(value) !== null
}

function buildRedirect(target: string, headers: Headers): Response {
  const response = redirect(target)
  for (const [key, value] of headers) {
    if (key.toLowerCase() === "set-cookie") {
      response.headers.append("set-cookie", value)
    } else {
      response.headers.set(key, value)
    }
  }
  return response
}

export async function authGuard(
  request: Request,
  config: AuthRouteConfig
): Promise<Response | AuthGuardPass> {
  const { headers, user } = await refreshSession(request)

  const url = new URL(request.url)
  const pathname = url.pathname
  const isAuthRoute = config.authPaths.includes(pathname)
  const isInternalApiRoute = matchesInternal(pathname, config.internalApiPaths)
  const isAuthenticated = isEffectivelyAuthenticated({
    signInOnInvalidSession: config.signInOnInvalidSession ?? false,
    hadSessionCookie: hasSessionCookie(request.headers.get("cookie")),
    sessionValid: user != null,
  })
  const requireAuth = config.requireAuth ?? true

  if (pathname === "/" && config.rootRedirects) {
    const target = isAuthenticated
      ? config.rootRedirects.authenticated
      : config.rootRedirects.unauthenticated
    if (target != null) {
      return buildRedirect(target, headers)
    }
  }

  if (isAuthenticated && isAuthRoute) {
    const next = url.searchParams.get("next")
    if (next != null && config.externalRedirectPattern?.test(next) === true) {
      return buildRedirect(next, headers)
    }
    const internalTarget = isSafeInternalPath(next) ? next : "/"
    return buildRedirect(internalTarget, headers)
  }

  if (requireAuth && !isAuthenticated && !isAuthRoute && !isInternalApiRoute) {
    const originalPath = pathname + url.search
    const target =
      originalPath !== "/"
        ? `${config.signInPath}?next=${encodeURIComponent(originalPath)}`
        : config.signInPath
    return buildRedirect(target, headers)
  }

  return { kind: "pass", headers }
}
