import { grantsRoute } from "@shared/person-access/route-access"

export interface ScriptedAccessRecord {
  readonly grant: (accountUserId: string, target: string) => void
  readonly revoke: (accountUserId: string, target: string) => void
  readonly clear: () => void
  readonly reads: () => number
  readonly holdsRouteAccess: (accountUserId: string, target: string) => Promise<boolean>
}

export function scriptedAccessRecord(): ScriptedAccessRecord {
  const rows = new Map<string, Set<string>>()
  let reads = 0

  return {
    grant(accountUserId, target) {
      const held = rows.get(accountUserId) ?? new Set<string>()
      held.add(target)
      rows.set(accountUserId, held)
    },
    revoke(accountUserId, target) {
      rows.get(accountUserId)?.delete(target)
    },
    clear() {
      rows.clear()
      reads = 0
    },
    reads: () => reads,
    holdsRouteAccess: async (accountUserId, target) => {
      reads++
      const granted = rows.get(accountUserId) ?? new Set<string>()
      return grantsRoute({ personSlug: accountUserId, granted }, target)
    },
  }
}
