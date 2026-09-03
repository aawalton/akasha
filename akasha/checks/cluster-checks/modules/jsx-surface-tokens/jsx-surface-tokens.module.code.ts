const SURFACE_LITERAL_RE = /^bg-surface-[0-4]$/

export function isHardcodedSurfaceLiteral(rawToken: string): boolean {
  if (rawToken.includes(":")) return false
  const t = rawToken.startsWith("!") ? rawToken.slice(1) : rawToken
  return SURFACE_LITERAL_RE.test(t)
}
