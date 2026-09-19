import { signedInAs } from "akasha/alan/harness/better-auth-rr/modules/google-auth-guard/google-auth-guard.module.code.ts"
import {
  asAccount,
  asContributor,
  type Whom,
} from "akasha/person/modules/enrolment/person-enrolment.module.code.ts"
import { routeAccessFor } from "akasha/person/modules/route-access/route-access.module.code.ts"

export async function holdsRouteAccessFor(whom: Whom, target: string): Promise<boolean> {
  const decision = await routeAccessFor(whom, target)
  if (!decision.permitted) {
    process.stderr.write(`[route-access] refusing: ${decision.why}\n`)
  }
  return decision.permitted
}

export async function holdsRouteAccess(
  accountUserId: string,
  target: string,
  request?: Request
): Promise<boolean> {
  if (request !== undefined) {
    const signed = await signedInAs(request)
    if (signed !== null) return holdsRouteAccessFor(asContributor(signed.contributor), target)
  }
  return holdsRouteAccessFor(asAccount(accountUserId), target)
}
