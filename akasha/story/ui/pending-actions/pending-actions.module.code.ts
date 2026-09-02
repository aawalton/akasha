import type { PendingActionInput } from "../client-envelope/client-envelope.module.code.ts"

function revealedFrontier(latestTurnAt: number | null, latestStateAt: number | null): number {
  return Math.max(
    latestTurnAt ?? Number.NEGATIVE_INFINITY,
    latestStateAt ?? Number.NEGATIVE_INFINITY
  )
}

export function selectPendingActions(
  actions: readonly PendingActionInput[],
  latestTurnAt: number | null,
  latestStateAt: number | null
): readonly PendingActionInput[] {
  const frontier = revealedFrontier(latestTurnAt, latestStateAt)
  return actions
    .filter((action) => action.submittedAt > frontier)
    .sort((left, right) => left.submittedAt - right.submittedAt)
}
