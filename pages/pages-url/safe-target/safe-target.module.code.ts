const URL_STRIPPED_CHARS = /[\t\n\r]/

const PROBE_ORIGIN = "https://probe.invalid"

function resolvedOrigin(path: string): string | null {
  try {
    return new URL(path, PROBE_ORIGIN).origin
  } catch {
    return null
  }
}

export function safeInternalPath(path: string): string | null {
  if (!path.startsWith("/") || path.startsWith("//")) return null
  if (path.includes("\\") || path.includes("://")) return null
  if (URL_STRIPPED_CHARS.test(path)) return null
  if (resolvedOrigin(path) !== PROBE_ORIGIN) return null
  return path
}

export type SafeRedirectTargetArgs = {
  next: string | null
  allowedHosts: readonly string[]
}

export function safeRedirectTarget(args: SafeRedirectTargetArgs): string | null {
  if (args.next == null || args.next === "") return null
  const internal = safeInternalPath(args.next)
  if (internal !== null) return internal
  let parsed: URL
  try {
    parsed = new URL(args.next)
  } catch {
    return null
  }
  if (parsed.protocol !== "https:") return null
  const host = parsed.hostname.toLowerCase()
  for (const allowed of args.allowedHosts) {
    const allowedHost = allowed.toLowerCase()
    if (host === allowedHost || host.endsWith(`.${allowedHost}`)) return args.next
  }
  return null
}
