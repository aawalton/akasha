"use client"

import { ButtonBadge } from "@akasha/design-badges/button-badge"
import { PanelCard } from "@akasha/design-layout/panel-card"
import { Empty, EmptyDescription, EmptyHeader, EmptyTitle } from "@akasha/design-patterns/empty"
import { CardTitleBadges } from "@akasha/design-primitives/card"
import type { ControlledRule } from "@akasha/temper-items-rules-core/inventory-rule-controlled"
import type { AffectedItem } from "@akasha/temper-items-rules-core/inventory-rule-matcher-types"
import type { CategoryRule } from "@akasha/temper-items-rules-core/inventory-rule-types"
import { useCallback, useState } from "react"
import type {
  ActiveStatusFilter,
  LockStatusFilter,
} from "../inventory-filter-types/inventory-filter-types.module.code.ts"
import type { InventoryRulesHandlers } from "../inventory-rules-handlers/inventory-rules-handlers.module.code.ts"
import { RuleBulkActionBadge } from "../rule-bulk-action-badge/rule-bulk-action-badge.module.code.tsx"
import { RuleCard } from "../rule-card/rule-card.module.code.tsx"
import type { DestinationOptions } from "../use-destination-options/use-destination-options.module.code.ts"

const EMPTY_AFFECTED_ITEMS: AffectedItem[] = []

interface CharacterRulesPanelProps {
  characterRules: readonly CategoryRule[]
  controlledRules: readonly ControlledRule[]
  controlledAffectedItems: Map<string, readonly AffectedItem[]>
  globalPriorityMap: Map<string, number>
  totalRules: number
  controlledRulesCount: number
  filteredCharacterRules: readonly CategoryRule[]
  visibleCharacterRuleIds: Set<string> | null
  visibleControlledCharacterRuleIds: Set<string> | null
  duplicateRuleIds: Set<string>
  affectedItemsMap: Map<string, readonly AffectedItem[]> | null
  destinationOptions: DestinationOptions
  activeCharacterRuleIds: readonly string[]
  inactiveCharacterRuleIds: readonly string[]
  duplicateCharacterRuleIds: readonly string[]
  lockedCharacterRuleIds: readonly string[]
  unlockedCharacterRuleIds: readonly string[]
  activeDescriptions: readonly string[]
  inactiveDescriptions: readonly string[]
  duplicateDescriptions: readonly string[]
  unlockedDescriptions: readonly string[]
  onRuleStatusChange: (status: readonly ActiveStatusFilter[]) => void
  onRuleLockChange: (lock: readonly LockStatusFilter[]) => void
  handlers: InventoryRulesHandlers
  isSortActive?: boolean
}

export function CharacterRulesPanel({
  characterRules,
  controlledRules,
  controlledAffectedItems,
  globalPriorityMap,
  totalRules,
  controlledRulesCount,
  filteredCharacterRules,
  visibleCharacterRuleIds,
  visibleControlledCharacterRuleIds,
  duplicateRuleIds,
  affectedItemsMap,
  destinationOptions,
  activeCharacterRuleIds,
  inactiveCharacterRuleIds,
  duplicateCharacterRuleIds,
  lockedCharacterRuleIds,
  unlockedCharacterRuleIds,
  activeDescriptions,
  inactiveDescriptions,
  duplicateDescriptions,
  unlockedDescriptions,
  onRuleStatusChange,
  onRuleLockChange,
  handlers,
  isSortActive = false,
}: CharacterRulesPanelProps) {
  const {
    handleUpdateRule,
    handleRemoveRule,
    handleReorderRule,
    handleDuplicateRule,
    handleLockRule,
    handleBulkSetCategoryActive,
    handleBulkSetCategoryInactive,
    handleBulkDeleteCategoryRules,
    handleBulkLockCategoryRules,
    handleBulkUnlockCategoryRules,
    handleBulkForceSetCategoryActive,
    handleBulkForceSetCategoryInactive,
  } = handlers

  const ruleCount = characterRules.length
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set())
  const allIds = ruleCount + controlledRules.length
  const allExpanded = allIds > 0 && expandedIds.size >= allIds

  const toggleExpand = useCallback((ruleId: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev)
      if (next.has(ruleId)) next.delete(ruleId)
      else next.add(ruleId)
      return next
    })
  }, [])

  return (
    <PanelCard
      collapsible
      forceMount
      id="character-rules"
      title="Character Automations"
      headerSubtitle={
        <CardTitleBadges className="w-full">
          {activeCharacterRuleIds.length > 0 && (
            <RuleBulkActionBadge
              label="Active"
              count={activeCharacterRuleIds.length}
              variant="accent"
              ruleDescriptions={activeDescriptions}
              onShow={() => onRuleStatusChange(["active"])}
              onSetInactive={() => handleBulkSetCategoryInactive(activeCharacterRuleIds)}
              onLock={() => handleBulkLockCategoryRules(activeCharacterRuleIds)}
              onUnlock={() => handleBulkUnlockCategoryRules(activeCharacterRuleIds)}
              onDelete={() => handleBulkDeleteCategoryRules(activeCharacterRuleIds)}
            />
          )}
          {inactiveCharacterRuleIds.length > 0 && (
            <RuleBulkActionBadge
              label="Inactive"
              count={inactiveCharacterRuleIds.length}
              variant="elevation-muted"
              ruleDescriptions={inactiveDescriptions}
              onShow={() => onRuleStatusChange(["inactive"])}
              onSetActive={() => handleBulkSetCategoryActive(inactiveCharacterRuleIds)}
              onLock={() => handleBulkLockCategoryRules(inactiveCharacterRuleIds)}
              onUnlock={() => handleBulkUnlockCategoryRules(inactiveCharacterRuleIds)}
              onDelete={() => handleBulkDeleteCategoryRules(inactiveCharacterRuleIds)}
            />
          )}
          {duplicateCharacterRuleIds.length > 0 && (
            <RuleBulkActionBadge
              label="Duplicate"
              count={duplicateCharacterRuleIds.length}
              variant="elevation-muted"
              ruleDescriptions={duplicateDescriptions}
              onShow={() => onRuleStatusChange(["duplicate"])}
              onSetActive={() => handleBulkSetCategoryActive(duplicateCharacterRuleIds)}
              onSetInactive={() => handleBulkSetCategoryInactive(duplicateCharacterRuleIds)}
              onDelete={() => handleBulkDeleteCategoryRules(duplicateCharacterRuleIds)}
            />
          )}
          {lockedCharacterRuleIds.length > 0 && (
            <RuleBulkActionBadge
              label="Locked"
              count={lockedCharacterRuleIds.length}
              variant="elevation-muted"
              onShow={() => onRuleLockChange(["locked"])}
              onSetActive={() => handleBulkForceSetCategoryActive(lockedCharacterRuleIds)}
              onSetInactive={() => handleBulkForceSetCategoryInactive(lockedCharacterRuleIds)}
              onUnlock={() => handleBulkUnlockCategoryRules(lockedCharacterRuleIds)}
            />
          )}
          {unlockedCharacterRuleIds.length > 0 && (
            <RuleBulkActionBadge
              label="Unlocked"
              count={unlockedCharacterRuleIds.length}
              variant="elevation-muted"
              ruleDescriptions={unlockedDescriptions}
              onShow={() => onRuleLockChange(["unlocked"])}
              onSetActive={() => handleBulkSetCategoryActive(unlockedCharacterRuleIds)}
              onSetInactive={() => handleBulkSetCategoryInactive(unlockedCharacterRuleIds)}
              onLock={() => handleBulkLockCategoryRules(unlockedCharacterRuleIds)}
              onDelete={() => handleBulkDeleteCategoryRules(unlockedCharacterRuleIds)}
            />
          )}
          {allIds > 0 && (
            <div className="ml-auto flex shrink-0 items-center gap-1.5">
              <ButtonBadge
                variant="elevation-muted"
                className="active:opacity-70"
                onClick={(e) => {
                  e.stopPropagation()
                  if (allExpanded) {
                    setExpandedIds(new Set())
                  } else {
                    setExpandedIds(
                      new Set([
                        ...controlledRules.map((r) => r.id),
                        ...characterRules.map((r) => r.id),
                      ])
                    )
                  }
                }}
              >
                {allExpanded ? "Collapse All" : "Expand All"}
              </ButtonBadge>
            </div>
          )}
        </CardTitleBadges>
      }
    >
      {ruleCount === 0 && controlledRules.length === 0 ? (
        <Empty>
          <EmptyHeader>
            <EmptyTitle>No character rules yet</EmptyTitle>
            <EmptyDescription>
              Enable automation settings for equipment or consumables to add rules automatically, or
              add custom rules for your characters.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      ) : (
        <div className="flex flex-col gap-3">
          {controlledRules.map((rule, i) => (
            <div
              key={rule.id}
              hidden={
                visibleControlledCharacterRuleIds !== null &&
                !visibleControlledCharacterRuleIds.has(rule.id)
              }
            >
              <RuleCard
                rule={rule}
                controlled={rule}
                priorityIndex={i + 1}
                affectedItems={controlledAffectedItems.get(rule.id) ?? EMPTY_AFFECTED_ITEMS}
                isExpanded={expandedIds.has(rule.id)}
                onToggleExpand={toggleExpand}
              />
            </div>
          ))}
          {filteredCharacterRules.length === 0 && ruleCount > 0 && (
            <Empty>
              <EmptyHeader>
                <EmptyTitle>No matching rules</EmptyTitle>
                <EmptyDescription>No character rules match the current filter.</EmptyDescription>
              </EmptyHeader>
            </Empty>
          )}
          {characterRules.map((rule) => {
            const isHidden =
              visibleCharacterRuleIds !== null && !visibleCharacterRuleIds.has(rule.id)
            const priorityIndex = globalPriorityMap.get(rule.id) ?? 0
            return (
              <div key={rule.id} hidden={isHidden}>
                <RuleCard
                  rule={rule}
                  priorityIndex={priorityIndex}
                  totalRules={totalRules}
                  controlledRulesCount={controlledRulesCount}
                  isDuplicate={duplicateRuleIds.has(rule.id)}
                  affectedItems={affectedItemsMap?.get(rule.id) ?? EMPTY_AFFECTED_ITEMS}
                  destinationOptions={destinationOptions}
                  isExpanded={expandedIds.has(rule.id)}
                  onToggleExpand={toggleExpand}
                  onUpdate={handleUpdateRule}
                  onRemove={handleRemoveRule}
                  onReorder={handleReorderRule}
                  onDuplicate={handleDuplicateRule}
                  onLock={handleLockRule}
                  isSortActive={isSortActive}
                />
              </div>
            )
          })}
        </div>
      )}
    </PanelCard>
  )
}
