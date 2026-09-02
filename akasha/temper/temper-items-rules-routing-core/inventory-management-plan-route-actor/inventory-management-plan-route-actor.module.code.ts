import type {
  RouteStep,
  VenueType,
} from "../inventory-management-plan-types/inventory-management-plan-types.module.code.ts"

export function stepsForActor(
  steps: readonly RouteStep[],
  characterId: string,
  venue: VenueType
): readonly RouteStep[] {
  return steps.filter((s) => s.characterId === characterId && s.venue === venue)
}
