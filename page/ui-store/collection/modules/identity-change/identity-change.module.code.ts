import type { PagesSyncController } from "akasha/page/ui-store/collection/modules/sync-controller/sync-controller.module.code.ts"

interface IdentityChangeDecision {
  readonly wipe: boolean
  readonly nextOwner: string | null
}

export function decideIdentityChange(
  owner: string | null,
  incoming: string | null
): IdentityChangeDecision {
  if (incoming !== null && owner !== null && incoming !== owner) {
    return { wipe: true, nextOwner: incoming }
  }
  if (incoming !== null && owner === null) {
    return { wipe: false, nextOwner: incoming }
  }
  return { wipe: false, nextOwner: owner }
}

type WipeController = Pick<PagesSyncController, "isReady" | "resetAll">

interface Clearable {
  readonly clear: () => unknown
}

export function applyIdentityChange(
  decision: IdentityChangeDecision,
  controller: WipeController,
  delivered: Clearable
): undefined {
  if (!decision.wipe) return
  if (controller.isReady()) controller.resetAll()
  delivered.clear()
}
