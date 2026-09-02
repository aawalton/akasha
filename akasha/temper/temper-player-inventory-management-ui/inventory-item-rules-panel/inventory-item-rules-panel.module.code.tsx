"use client"

import { PanelCard } from "@akasha/design-layout/panel-card"
import { Empty, EmptyDescription, EmptyHeader, EmptyTitle } from "@akasha/design-patterns/empty"
import { Button } from "@akasha/design-primitives/button"
import { CardTitleBadges } from "@akasha/design-primitives/card"
import type { MinedItemSearchResult } from "@akasha/temper-items-core/item-tooltip-types"
import type { ItemRule } from "@akasha/temper-items-rules-core/inventory-rule-types"
import { Plus } from "lucide-react"
import { useState } from "react"
import type {
  ActiveStatusFilter,
  LockStatusFilter,
} from "../inventory-filter-types/inventory-filter-types.module.code.ts"
import { ResetBadge } from "../inventory-reset-badge/inventory-reset-badge.module.code.tsx"
import type { InventoryRulesHandlers } from "../inventory-rules-handlers/inventory-rules-handlers.module.code.ts"
import { ItemRuleCard } from "../item-rule-card/item-rule-card.module.code.tsx"
import { ItemSearchDialog } from "../item-search-dialog/item-search-dialog.module.code.tsx"
import { RuleBulkActionBadge } from "../rule-bulk-action-badge/rule-bulk-action-badge.module.code.tsx"
import type { DestinationOptions } from "../use-destination-options/use-destination-options.module.code.ts"

interface ItemRulesPanelProps {
  itemRules: readonly ItemRule[]
  filteredItemRules: readonly ItemRule[]
  visibleItemRuleIds: Set<string> | null
  destinationOptions: DestinationOptions
  activeItemRuleIds: readonly string[]
  inactiveItemRuleIds: readonly string[]
  lockedItemRuleIds: readonly string[]
  unlockedItemRuleIds: readonly string[]
  activeDescriptions: readonly string[]
  inactiveDescriptions: readonly string[]
  unlockedDescriptions: readonly string[]
  onRuleStatusChange: (status: readonly ActiveStatusFilter[]) => void
  onRuleLockChange: (lock: readonly LockStatusFilter[]) => void
  handlers: InventoryRulesHandlers
}

export function ItemRulesPanel({
  itemRules,
  filteredItemRules,
  visibleItemRuleIds,
  destinationOptions,
  activeItemRuleIds,
  inactiveItemRuleIds,
  lockedItemRuleIds,
  unlockedItemRuleIds,
  activeDescriptions,
  inactiveDescriptions,
  unlockedDescriptions,
  onRuleStatusChange,
  onRuleLockChange,
  handlers,
}: ItemRulesPanelProps) {
  const {
    handleAddItemRule,
    handleUpdateItemRule,
    handleRemoveItemRule,
    handleDuplicateItemRule,
    handleLockItemRule,
    handleResetItemRules,
    handleBulkSetItemActive,
    handleBulkSetItemInactive,
    handleBulkDeleteItemRules,
    handleBulkLockItemRules,
    handleBulkUnlockItemRules,
    handleBulkForceSetItemActive,
    handleBulkForceSetItemInactive,
  } = handlers

  const [searchOpen, setSearchOpen] = useState(false)
  const itemRuleCount = itemRules.length

  const handleItemSelect = (item: MinedItemSearchResult) => {
    handleAddItemRule({ itemId: item.itemId, itemName: item.name })
  }

  return (
    <PanelCard
      collapsible
      forceMount
      id="item-rules"
      title="Item Rules"
      headerSubtitle={
        <CardTitleBadges className="w-full">
          {activeItemRuleIds.length > 0 && (
            <RuleBulkActionBadge
              label="Active"
              count={activeItemRuleIds.length}
              variant="accent"
              ruleDescriptions={activeDescriptions}
              onShow={() => onRuleStatusChange(["active"])}
              onSetInactive={() => handleBulkSetItemInactive(activeItemRuleIds)}
              onLock={() => handleBulkLockItemRules(activeItemRuleIds)}
              onUnlock={() => handleBulkUnlockItemRules(activeItemRuleIds)}
              onDelete={() => handleBulkDeleteItemRules(activeItemRuleIds)}
            />
          )}
          {inactiveItemRuleIds.length > 0 && (
            <RuleBulkActionBadge
              label="Inactive"
              count={inactiveItemRuleIds.length}
              variant="elevation-muted"
              ruleDescriptions={inactiveDescriptions}
              onShow={() => onRuleStatusChange(["inactive"])}
              onSetActive={() => handleBulkSetItemActive(inactiveItemRuleIds)}
              onLock={() => handleBulkLockItemRules(inactiveItemRuleIds)}
              onUnlock={() => handleBulkUnlockItemRules(inactiveItemRuleIds)}
              onDelete={() => handleBulkDeleteItemRules(inactiveItemRuleIds)}
            />
          )}
          {lockedItemRuleIds.length > 0 && (
            <RuleBulkActionBadge
              label="Locked"
              count={lockedItemRuleIds.length}
              variant="elevation-muted"
              onShow={() => onRuleLockChange(["locked"])}
              onSetActive={() => handleBulkForceSetItemActive(lockedItemRuleIds)}
              onSetInactive={() => handleBulkForceSetItemInactive(lockedItemRuleIds)}
              onUnlock={() => handleBulkUnlockItemRules(lockedItemRuleIds)}
            />
          )}
          {unlockedItemRuleIds.length > 0 && (
            <RuleBulkActionBadge
              label="Unlocked"
              count={unlockedItemRuleIds.length}
              variant="elevation-muted"
              ruleDescriptions={unlockedDescriptions}
              onShow={() => onRuleLockChange(["unlocked"])}
              onSetActive={() => handleBulkSetItemActive(unlockedItemRuleIds)}
              onSetInactive={() => handleBulkSetItemInactive(unlockedItemRuleIds)}
              onLock={() => handleBulkLockItemRules(unlockedItemRuleIds)}
              onDelete={() => handleBulkDeleteItemRules(unlockedItemRuleIds)}
            />
          )}
          {itemRuleCount > 0 && (
            <div className="ml-auto shrink-0">
              <ResetBadge
                title="Reset Item Rules?"
                description={
                  itemRules.some((r) => r.locked)
                    ? "This will remove all unlocked item-specific overrides. Locked rules will be preserved."
                    : "This will remove all item-specific overrides. This action cannot be undone."
                }
                onReset={handleResetItemRules}
              />
            </div>
          )}
        </CardTitleBadges>
      }
    >
      <ItemSearchDialog
        open={searchOpen}
        onOpenChange={setSearchOpen}
        onSelect={handleItemSelect}
        title="Add Item Rule"
      />
      {itemRuleCount === 0 ? (
        <Empty>
          <EmptyHeader>
            <EmptyTitle>No item rules yet</EmptyTitle>
            <EmptyDescription>
              Item rules target specific items by ESO item ID, overriding category rules.
            </EmptyDescription>
          </EmptyHeader>
          <Button variant="secondary" size="sm" onClick={() => setSearchOpen(true)}>
            <Plus className="size-3.5" />
            Add Item Rule
          </Button>
        </Empty>
      ) : (
        <div className="flex flex-col gap-3">
          {filteredItemRules.length === 0 && (
            <Empty>
              <EmptyHeader>
                <EmptyTitle>No matching rules</EmptyTitle>
                <EmptyDescription>No item rules match the current filter.</EmptyDescription>
              </EmptyHeader>
            </Empty>
          )}
          {itemRules.map((rule) => {
            const isHidden = visibleItemRuleIds !== null && !visibleItemRuleIds.has(rule.id)
            return (
              <div key={rule.id} hidden={isHidden}>
                <ItemRuleCard
                  rule={rule}
                  destinationOptions={destinationOptions}
                  onUpdate={handleUpdateItemRule}
                  onRemove={handleRemoveItemRule}
                  onDuplicate={handleDuplicateItemRule}
                  onLock={handleLockItemRule}
                />
              </div>
            )
          })}
          <button
            type="button"
            className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-md border border-white/10 border-dashed p-3 text-sm text-tertiary transition-colors hover:bg-primary/8 hover:text-secondary"
            onClick={() => setSearchOpen(true)}
          >
            <Plus className="size-3.5" />
            Add Item Rule
          </button>
        </div>
      )}
    </PanelCard>
  )
}
