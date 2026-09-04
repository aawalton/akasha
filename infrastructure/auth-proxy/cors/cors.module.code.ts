import { CONFIG } from "../auth-proxy-config/auth-proxy-config.module.code.ts"
import { applyCorsHeadersWith, matchesAllowedOrigin } from "../cors-core/cors-core.module.code.ts"

function isAllowedOrigin(origin: string | null): origin is string {
  return matchesAllowedOrigin(
    origin,
    CONFIG.CORS_ALLOWED_ORIGINS,
    CONFIG.CORS_ALLOWED_ORIGIN_PATTERNS
  )
}

export function buildPreflightResponse(req: Request): Response {
  const origin = req.headers.get("origin")
  const reqHeaders = req.headers.get("access-control-request-headers")

  const headers = new Headers()
  if (isAllowedOrigin(origin)) {
    headers.set("Access-Control-Allow-Origin", origin)
    headers.set("Access-Control-Allow-Credentials", "true")
    headers.set("Vary", "Origin")
  }
  headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS, HEAD")
  if (reqHeaders != null) {
    headers.set("Access-Control-Allow-Headers", reqHeaders)
  }
  headers.set("Access-Control-Max-Age", "86400")

  return new Response(null, { status: 204, headers })
}

export function applyCorsHeaders(resp: Response, req: Request): Response {
  return applyCorsHeadersWith(
    resp,
    req.headers.get("origin"),
    CONFIG.CORS_ALLOWED_ORIGINS,
    CONFIG.CORS_ALLOWED_ORIGIN_PATTERNS
  )
}
