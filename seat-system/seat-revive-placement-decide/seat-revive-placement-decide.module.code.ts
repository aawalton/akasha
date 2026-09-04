export const REVIVE_PLACEMENTS = ["restart-in-place", "headless"] as const

export type RevivePlacement = (typeof REVIVE_PLACEMENTS)[number]

export interface RevivePlacementInput {
  readonly priorLaunchOpened: boolean
  readonly isLive: boolean
}

export function decideRevivePlacement(input: RevivePlacementInput): RevivePlacement {
  return input.priorLaunchOpened && input.isLive ? "restart-in-place" : "headless"
}
