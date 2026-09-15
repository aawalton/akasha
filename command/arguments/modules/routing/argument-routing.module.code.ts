const ROUTE_SUFFIX = "-file"

export function routeFor(said: string): string {
  return `${said}${ROUTE_SUFFIX}`
}
