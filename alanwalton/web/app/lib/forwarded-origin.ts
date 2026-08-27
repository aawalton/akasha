const FORWARDED_PROTOS = new Set(["http", "https"])

export function forwardedOrigin(url: URL, forwardedProto: string | null): string {
  const first = forwardedProto?.split(",")[0]?.trim().toLowerCase()
  const scheme =
    first != null && FORWARDED_PROTOS.has(first) ? first : url.protocol.replace(/:$/, "")
  return `${scheme}://${url.host}`
}
