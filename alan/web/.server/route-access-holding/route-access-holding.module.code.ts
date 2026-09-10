import { routeAccessForAccount } from "akasha/persons/route-access/route-access.module.code.ts"

export async function holdsRouteAccess(accountUserId: string, target: string): Promise<boolean> {
  const decision = await routeAccessForAccount(accountUserId, target)
  if (!decision.permitted) {
    process.stderr.write(`[route-access] refusing: ${decision.why}\n`)
  }
  return decision.permitted
}
