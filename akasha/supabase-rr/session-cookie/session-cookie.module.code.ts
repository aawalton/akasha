export function hasSessionCookie(cookieHeader: string | null): boolean {
  if (cookieHeader == null || cookieHeader === "") return false
  const pattern = /(?:^|;\s*)(sb-[^=]*-auth-token(?:\.\d+)?)=([^;]*)/g
  for (const match of cookieHeader.matchAll(pattern)) {
    const value = match[2]
    if (value != null && value !== "" && value !== '""') return true
  }
  return false
}
