import type { PagesSyncController } from "../sync-controller/sync-controller.module.code.ts"

export interface IdentityChangeDecision {
  readonly wipe: boolean
  readonly nextOwnerSub: string | null
}

export function decideIdentityChange(
  ownerSub: string | null,
  incomingSub: string | null
): IdentityChangeDecision {
  if (incomingSub !== null && ownerSub !== null && incomingSub !== ownerSub) {
    return { wipe: true, nextOwnerSub: incomingSub }
  }
  if (incomingSub !== null && ownerSub === null) {
    return { wipe: false, nextOwnerSub: incomingSub }
  }
  return { wipe: false, nextOwnerSub: ownerSub }
}

type WipeController = Pick<PagesSyncController, "isReady" | "resetAll">

interface Clearable {
  readonly clear: () => unknown
}

export function applyIdentityChange(
  decision: IdentityChangeDecision,
  controller: WipeController,
  resume: Clearable,
  delivered: Clearable
): undefined {
  if (!decision.wipe) return
  if (controller.isReady()) controller.resetAll()
  resume.clear()
  delivered.clear()
}
