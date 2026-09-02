const CAPACITOR_ORIGIN = "capacitor://localhost"

type OriginBearing = { headers: Pick<Headers, "get"> }

export function capacitorCorsHeaders(
  request: OriginBearing,
  methods: string,
  opts?: { allowHeaders?: string; exposeHeaders?: string }
): Record<string, string> {
  if (request.headers.get("Origin") !== CAPACITOR_ORIGIN) return {}
  const headers: Record<string, string> = {
    "Access-Control-Allow-Origin": CAPACITOR_ORIGIN,
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
