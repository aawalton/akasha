const SHELL_ORIGINS: readonly string[] = ["https://alanwalton.com", "capacitor://localhost"]

type OriginBearing = { headers: Pick<Headers, "get"> }

export function capacitorCorsHeaders(
  request: OriginBearing,
  methods: string,
  opts?: { allowHeaders?: string; exposeHeaders?: string }
): Record<string, string> {
  const origin = request.headers.get("Origin")
  if (origin === null || !SHELL_ORIGINS.includes(origin)) return {}
  const headers: Record<string, string> = {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": methods,
    "Access-Control-Allow-Headers": opts?.allowHeaders ?? "Authorization, Content-Type",
    "Access-Control-Max-Age": "86400",
    Vary: "Origin",
  }
  if (opts?.exposeHeaders != null) {
    headers["Access-Control-Expose-Headers"] = opts.exposeHeaders
  }
  return headers
}

export function withCors(headers: Headers, cors: Record<string, string>): Headers {
  for (const [key, value] of Object.entries(cors)) headers.set(key, value)
  return headers
}

export function corsPreflight(cors: Record<string, string>): Response {
  return new Response(null, { status: 204, headers: withCors(new Headers(), cors) })
}

export function corsAnswered(answered: Response, cors: Record<string, string>): Response {
  if (Object.keys(cors).length === 0) return answered
  return new Response(answered.body, {
    status: answered.status,
    headers: withCors(new Headers(answered.headers), cors),
  })
}
