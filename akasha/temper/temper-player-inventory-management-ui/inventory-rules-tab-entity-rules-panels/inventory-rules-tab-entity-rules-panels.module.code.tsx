"use client"

import type { ControlledRule } from "@akasha/temper-items-rules-core/inventory-rule-controlled"
import type { AffectedItem } from "@akasha/temper-items-rules-core/inventory-rule-matcher-types"
import type { CategoryRule } from "@akasha/temper-items-rules-core/inventory-rule-types"
import type * as React from "react"
import { CharacterRulesPanel } from "../inventory-character-rules-panel/inventory-character-rules-panel.module.code.tsx"
import { CompanionRulesPanel } from "../inventory-companion-rules-panel/inventory-companion-rules-panel.module.code.tsx"
import type {
  ActiveStatusFilter,
  LockStatusFilter,
} from "../inventory-filter-types/inventory-filter-types.module.code.ts"
import type { InventoryRulesHandlers } from "../inventory-rules-handlers/inventory-rules-handlers.module.code.ts"
import type { DestinationOptions } from "../use-destination-options/use-destination-options.module.code.ts"

interface RulePartition {
  active: readonly string[]
  inactive: readonly string[]
  duplicate: readonly string[]
  locked: readonly string[]
  unlocked: readonly string[]
}

interface EntityRulesPanelsProps {
  companionRules: readonly CategoryRule[]
  sortedCharacterRules: readonly CategoryRule[]
  sortedCompanionRules: readonly CategoryRule[]
  filteredCharacterRules: readonly CategoryRule[]
  filteredCompanionRules: readonly CategoryRule[]
  controlledCharacterRules: readonly ControlledRule[]
  controlledCompanionRules: readonly ControlledRule[]
  controlledRulesCount: number
  globalPriorityMap: Map<string, number>
  totalRules: number
  visibleCharacterRuleIds: Set<string> | null
  visibleCompanionRuleIds: Set<string> | null
  visibleControlledCharacterRuleIds: Set<string> | null
  visibleControlledCompanionRuleIds: Set<string> | null
  duplicateRuleIds: Set<string>
  affectedItemsMap: Map<string, readonly AffectedItem[]> | null
  destinationOptions: DestinationOptions
  characterPartition: RulePartition
  companionPartition: RulePartition
  characterActiveDescriptions: readonly string[]
  characterInactiveDescriptions: readonly string[]
  characterDuplicateDescriptions: readonly string[]
  characterUnlockedDescriptions: readonly string[]
  companionActiveDescriptions: readonly string[]
  companionInactiveDescriptions: readonly string[]
  companionDuplicateDescriptions: readonly string[]
  companionUnlockedDescriptions: readonly string[]
  onRuleStatusChange: (status: readonly ActiveStatusFilter[]) => void
  onRuleLockChange: (lock: readonly LockStatusFilter[]) => void
  handlers: InventoryRulesHandlers
  isSortActive: boolean
  hideCharacterPanel: boolean
  hideCompanionPanel: boolean
}

export function EntityRulesPanels({
  companionRules,
  sortedCharacterRules,
  sortedCompanionRules,
  filteredCharacterRules,
  filteredCompanionRules,
  controlledCharacterRules,
  controlledCompanionRules,
  controlledRulesCount,
  globalPriorityMap,
  totalRules,
  visibleCharacterRuleIds,
  visibleCompanionRuleIds,
  visibleControlledCharacterRuleIds,
  visibleControlledCompanionRuleIds,
  duplicateRuleIds,
  affectedItemsMap,
  destinationOptions,
  characterPartition,
  companionPartition,
  characterActiveDescriptions,
  characterInactiveDescriptions,
  characterDuplicateDescriptions,
  characterUnlockedDescriptions,
  companionActiveDescriptions,
  companionInactiveDescriptions,
  companionDuplicateDescriptions,
  companionUnlockedDescriptions,
  onRuleStatusChange,
  onRuleLockChange,
  handlers,
  isSortActive,
  hideCharacterPanel,
  hideCompanionPanel,
}: EntityRulesPanelsProps): readonly React.ReactNode[] {
  return [
    <div key="character-rules" hidden={hideCharacterPanel}>
      <CharacterRulesPanel
        characterRules={sortedCharacterRules}
        controlledRules={controlledCharacterRules}
        controlledAffectedItems={affectedItemsMap ?? new Map()}
        globalPriorityMap={globalPriorityMap}
        totalRules={totalRules}
        controlledRulesCount={controlledRulesCount}
        filteredCharacterRules={filteredCharacterRules}
        visibleCharacterRuleIds={visibleCharacterRuleIds}
        visibleControlledCharacterRuleIds={visibleControlledCharacterRuleIds}
        duplicateRuleIds={duplicateRuleIds}
        affectedItemsMap={affectedItemsMap}
        destinationOptions={destinationOptions}
        activeCharacterRuleIds={characterPartition.active}
        inactiveCharacterRuleIds={characterPartition.inactive}
        duplicateCharacterRuleIds={characterPartition.duplicate}
        lockedCharacterRuleIds={characterPartition.locked}
        unlockedCharacterRuleIds={characterPartition.unlocked}
        activeDescriptions={characterActiveDescriptions}
        inactiveDescriptions={characterInactiveDescriptions}
        duplicateDescriptions={characterDuplicateDescriptions}
        unlockedDescriptions={characterUnlockedDescriptions}
        onRuleStatusChange={onRuleStatusChange}
        onRuleLockChange={onRuleLockChange}
        handlers={handlers}
        isSortActive={isSortActive}
      />
    </div>,
    (companionRules.length > 0 || controlledCompanionRules.length > 0) && (
      <div key="companion-rules" hidden={hideCompanionPanel}>
        <CompanionRulesPanel
          companionRules={sortedCompanionRules}
          controlledRules={controlledCompanionRules}
          controlledAffectedItems={affectedItemsMap ?? new Map()}
          globalPriorityMap={globalPriorityMap}
          totalRules={totalRules}
          controlledRulesCount={controlledRulesCount}
          filteredCompanionRules={filteredCompanionRules}
          visibleCompanionRuleIds={visibleCompanionRuleIds}
          visibleControlledCompanionRuleIds={visibleControlledCompanionRuleIds}
          duplicateRuleIds={duplicateRuleIds}
          affectedItemsMap={affectedItemsMap}
          destinationOptions={destinationOptions}
          activeCompanionRuleIds={companionPartition.active}
          inactiveCompanionRuleIds={companionPartition.inactive}
          duplicateCompanionRuleIds={companionPartition.duplicate}
          lockedCompanionRuleIds={companionPartition.locked}
          unlockedCompanionRuleIds={companionPartition.unlocked}
          activeDescriptions={companionActiveDescriptions}
          inactiveDescriptions={companionInactiveDescriptions}
          duplicateDescriptions={companionDuplicateDescriptions}
          unlockedDescriptions={companionUnlockedDescriptions}
          onRuleStatusChange={onRuleStatusChange}
          onRuleLockChange={onRuleLockChange}
          handlers={handlers}
          isSortActive={isSortActive}
        />
      </div>
    ),
  ]
}
