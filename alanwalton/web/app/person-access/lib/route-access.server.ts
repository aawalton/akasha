import { routeAccessForAccount } from "@akasha/person-system/route-access"

export { ROUTE_TARGETS } from "@akasha/person-system/route-access"

export async function holdsRouteAccess(accountUserId: string, target: string): Promise<boolean> {
  const decision = await routeAccessForAccount(accountUserId, target)
  if (!decision.permitted) {
    process.stderr.write(`[route-access] refusing: ${decision.why}\n`)
  }
  return decision.permitted
}
