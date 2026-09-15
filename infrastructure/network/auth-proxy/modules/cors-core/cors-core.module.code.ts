export function matchesAllowedOrigin(
  origin: string | null,
  allowedOrigins: readonly string[],
  allowedPatterns: readonly RegExp[]
): origin is string {
  if (origin === null) return false
  if (allowedOrigins.includes(origin)) return true
  return allowedPatterns.some((pattern) => pattern.test(origin))
}

export function applyCorsHeadersWith(
  resp: Response,
  origin: string | null,
  allowedOrigins: readonly string[],
  allowedPatterns: readonly RegExp[]
): Response {
  if (!matchesAllowedOrigin(origin, allowedOrigins, allowedPatterns)) return resp

  const headers = new Headers(resp.headers)
  headers.set("Access-Control-Allow-Origin", origin)
  headers.set("Access-Control-Allow-Credentials", "true")
  const existingVary = headers.get("Vary")
  headers.set("Vary", existingVary != null ? `${existingVary}, Origin` : "Origin")
  return new Response(resp.body, {
    status: resp.status,
    statusText: resp.statusText,
    headers,
  })
}
