import type { ItemAction } from "../inventory-rule-types/inventory-rule-types.module.code.ts"
import type { InventoryConfig } from "../inventory-settings-types/inventory-settings-types.module.code.ts"
import type {
  RuleConditionStates,
  RuleStates,
} from "../rule-condition-states/rule-condition-states.module.code.ts"

export type ConditionalActions = Pick<
  InventoryConfig,
  | "stolenActions"
  | "notStolenActions"
  | "craftedActions"
  | "notCraftedActions"
  | "boundActions"
  | "notBoundActions"
  | "reconstructedActions"
  | "notReconstructedActions"
  | "transmutedActions"
  | "notTransmutedActions"
  | "knownActions"
  | "notKnownActions"
  | "canInspireActions"
  | "notCanInspireActions"
  | "canResearchActions"
  | "notCanResearchActions"
  | "canUnlockActions"
  | "notCanUnlockActions"
  | "canOpenActions"
  | "canGiveMaxRewardsActions"
>

function toActions(states: RuleStates, skipNodeId?: string): Record<string, ItemAction | false> {
  const actions: Record<string, ItemAction | false> = {}
  for (const [nodeId, act] of Object.entries(states)) {
    if (act == null || nodeId === skipNodeId) continue
    actions[nodeId] = act
  }
  return actions
}

export function buildConditionalActions(states: RuleConditionStates): ConditionalActions {
  return {
    stolenActions: toActions(states.stolen, "treasure"),
    notStolenActions: toActions(states.notStolen, "treasure"),
    craftedActions: toActions(states.crafted),
    notCraftedActions: toActions(states.notCrafted),
    boundActions: toActions(states.bound),
    notBoundActions: toActions(states.notBound),
    reconstructedActions: toActions(states.reconstructed),
    notReconstructedActions: toActions(states.notReconstructed),
    transmutedActions: toActions(states.transmuted),
    notTransmutedActions: toActions(states.notTransmuted),
    knownActions: toActions(states.known),
    notKnownActions: toActions(states.notKnown),
    canInspireActions: toActions(states.canInspire),
    notCanInspireActions: toActions(states.notCanInspire),
    canResearchActions: toActions(states.canResearch),
    notCanResearchActions: toActions(states.notCanResearch),
    canUnlockActions: toActions(states.canUnlock),
    notCanUnlockActions: toActions(states.notCanUnlock),
    canOpenActions: toActions(states.canOpen),
    canGiveMaxRewardsActions: toActions(states.canGiveMaxRewards),
  }
}
