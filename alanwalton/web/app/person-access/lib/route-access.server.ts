import { decideRouteAccess } from "@shared/person-access/route-access"
import { personSlugForAccount } from "@shared/person-enrolment/record"

async function decideForAccount(
  accountUserId: string,
  target: string
): Promise<{ readonly permitted: boolean; readonly unreadable?: string }> {
  let personSlug: string | null
  try {
    personSlug = await personSlugForAccount(accountUserId)
  } catch (error) {
    return {
      permitted: false,
      unreadable: `no person could be read for account ${accountUserId}: ${
        error instanceof Error ? error.message : String(error)
      }`,
    }
  }
  if (personSlug === null) {
    return { permitted: false, unreadable: `no person page states account ${accountUserId}` }
  }
  return decideRouteAccess(personSlug, target)
}

export async function holdsRouteAccess(accountUserId: string, target: string): Promise<boolean> {
  const decision = await decideForAccount(accountUserId, target)
  if (decision.unreadable !== undefined) {
    process.stderr.write(
      `[route-access] refusing: could not read the access record — ${decision.unreadable}\n`
    )
  }
  return decision.permitted
}
