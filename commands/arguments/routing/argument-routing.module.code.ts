const FLAG = "--"

const ROUTE_SUFFIX = "-file"

export function routeFor(said: string): string {
  return `${said}${ROUTE_SUFFIX}`
}

export function routedBy(said: string): string | null {
  if (!said.endsWith(ROUTE_SUFFIX)) return null
  const named = said.slice(0, -ROUTE_SUFFIX.length)
  return named.length > FLAG.length && named.startsWith(FLAG) ? named : null
}
