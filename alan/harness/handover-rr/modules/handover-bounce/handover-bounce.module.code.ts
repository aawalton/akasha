export function passingOn(bounced: Response): Headers {
  const headers = new Headers()
  for (const [key, value] of bounced.headers) {
    const name = key.toLowerCase()
    if (name === "location" || name === "set-cookie") continue
    headers.set(key, value)
  }
  for (const one of bounced.headers.getSetCookie()) headers.append("set-cookie", one)
  return headers
}

export function bouncedToSignIn(answered: Response, signInPath: string): boolean {
  const sentTo = answered.headers.get("location") ?? ""
  return sentTo === signInPath || sentTo.startsWith(`${signInPath}?`)
}
