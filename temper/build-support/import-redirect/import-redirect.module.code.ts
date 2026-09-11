export function redirectingWith(carried: Headers, location: string): Response {
  const headers = new Headers({ Location: location })
  for (const cookie of carried.getSetCookie()) {
    headers.append("Set-Cookie", cookie)
  }
  return new Response(null, { status: 302, headers })
}
