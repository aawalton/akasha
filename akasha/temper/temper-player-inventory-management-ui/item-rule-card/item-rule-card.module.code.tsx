"use client"

import { Badge } from "@akasha/design-badges/badge"
import { ButtonBadge } from "@akasha/design-badges/button-badge"
import { NumberBadge } from "@akasha/design-badges/number-badge"
import { InlineEditableText } from "@akasha/design-forms/inline-editable-text"
import { ItemCard } from "@akasha/design-patterns/item-card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@akasha/design-primitives/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@akasha/design-primitives/select-control"
import { Text } from "@akasha/design-primitives/text-body"
import {
  goalIdToValue,
  goalValueToId,
  inventoryRuleGoals,
} from "@akasha/temper-items-rules-core/inventory-rule-goals"
import type { ItemRule } from "@akasha/temper-items-rules-core/inventory-rule-types"
import { EllipsisVertical, Info } from "lucide-react"
import { memo, useEffect, useState } from "react"
import {
  ACTION_OPTIONS,
  NOTHING_ACTION,
  SELL_ACTIONS,
  SELL_DESTINATION_OPTIONS,
} from "../action-options/action-options.module.code.ts"
import { CharacterTargetSelect } from "../character-target-select/character-target-select.module.code.tsx"
import { CompanionTargetSelect } from "../companion-target-select/companion-target-select.module.code.tsx"
import { DestinationCascade } from "../destination-cascade/destination-cascade.module.code.tsx"
import { itemRuleActionHandlers } from "../item-rule-card-action-handlers/item-rule-card-action-handlers.module.code.ts"
import { ItemRuleCardDialogs } from "../item-rule-card-dialogs/item-rule-card-dialogs.module.code.tsx"
import { RuleCardDestinationChain } from "../rule-card-destination-chain/rule-card-destination-chain.module.code.tsx"
import { StockScopeSelect } from "../stock-scope-select/stock-scope-select.module.code.tsx"
import type { DestinationOptions } from "../use-destination-options/use-destination-options.module.code.ts"

interface ItemRuleCardProps {
  rule: ItemRule
  destinationOptions: DestinationOptions
  onUpdate: (
    ruleId: string,
    patch: Partial<
      Pick<
        ItemRule,
        | "action"
        | "destination"
        | "active"
        | "goal"
        | "title"
        | "notes"
        | "stockQuantity"
        | "stockScope"
        | "destinationChain"
      >
    >
  ) => void
  onRemove: (ruleId: string) => void
  onDuplicate: (ruleId: string) => void
  onLock: (ruleId: string, locked: boolean) => void
}

export const ItemRuleCard = memo(function ItemRuleCard({
  rule,
  destinationOptions,
  onUpdate,
  onRemove,
  onDuplicate,
  onLock,
}: ItemRuleCardProps) {
  const displayAction = SELL_ACTIONS.has(rule.action) ? "sell" : rule.action
  const actionOption = ACTION_OPTIONS.find((o) => o.value === displayAction) ?? NOTHING_ACTION
  const isActive = rule.active !== false
  const [optimisticLocked, setOptimisticLocked] = useState(rule.locked === true)
  useEffect(() => {
    setOptimisticLocked(rule.locked === true)
  }, [rule.locked])
  const isLocked = optimisticLocked
  const [notesDialogOpen, setNotesDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

  const {
    useChain,
    handleActionChange,
    handleDestinationChange,
    handleSellDestinationChange,
    handleStockScopeChange,
    handleDestinationChainChange,
    handleToggleDestinationChain,
  } = itemRuleActionHandlers(rule, onUpdate)

  return (
    <>
      <ItemCard
        renderContent={() => (
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-1.5">
              {isLocked ? (
                rule.title != null ? (
                  <span className="min-w-0 flex-1 truncate font-medium text-primary text-sm">
                    {rule.title}
                  </span>
                ) : (
                  <span className="min-w-0 flex-1" />
                )
              ) : (
                <InlineEditableText
                  value={rule.title ?? ""}
                  onChange={(v) =>
                    onUpdate(rule.id, { title: v.trim().length === 0 ? null : v.trim() })
                  }
                  placeholder="Add a title..."
                  className="min-w-0 flex-1 font-medium text-primary text-sm"
                />
              )}
              <button
                type="button"
                className="inline-flex h-5 w-5 shrink-0 cursor-pointer items-center justify-center rounded transition-colors hover:bg-primary/8"
                onClick={() => setNotesDialogOpen(true)}
                title={rule.notes != null ? "Edit notes" : "Add notes"}
                aria-label={rule.notes != null ? "Edit notes" : "Add notes"}
              >
                <Info
                  className={`h-3.5 w-3.5 ${rule.notes != null ? "text-secondary" : "text-tertiary"}`}
                />
              </button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    type="button"
                    className="inline-flex h-5 w-5 shrink-0 cursor-pointer items-center justify-center rounded text-tertiary transition-colors hover:bg-primary/8"
                    aria-label="Rule actions"
                  >
                    <EllipsisVertical className="h-3.5 w-3.5" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => onDuplicate(rule.id)}>
                    Duplicate
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    variant="destructive"
                    disabled={isLocked}
                    onClick={() => setDeleteDialogOpen(true)}
                  >
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="flex items-center gap-1.5">
              <Text variant="description" className="font-medium text-primary">
                {rule.itemName}
              </Text>
              <Select
                value={goalValueToId(rule.goal)}
                onValueChange={(val) => onUpdate(rule.id, { goal: goalIdToValue(val) })}
              >
                <SelectTrigger hideChevron>
                  <Badge variant="elevation-muted" className="shrink-0">
                    <SelectValue />
                  </Badge>
                </SelectTrigger>
                <SelectContent nullSentinel={{ value: "none", label: "No Goal" }} sorted>
                  {inventoryRuleGoals.list
                    .filter((g) => g.id !== "none")
                    .map((g) => (
                      <SelectItem key={g.id} value={g.id}>
                        {g.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
            <div
              className={isLocked ? "pointer-events-none" : undefined}
              inert={isLocked || undefined}
            >
              <div className="flex flex-col gap-1.5">
                <div className="flex flex-wrap items-center gap-1.5">
                  {isLocked ? (
                    <Badge variant={isActive ? "accent" : "elevation-muted"} className="shrink-0">
                      {isActive ? "Active" : "Inactive"}
                    </Badge>
                  ) : (
                    <ButtonBadge
                      variant={isActive ? "accent" : "elevation-muted"}
                      className="shrink-0"
                      onClick={() => onUpdate(rule.id, { active: !isActive })}
                    >
                      {isActive ? "Active" : "Inactive"}
                    </ButtonBadge>
                  )}
                  <ButtonBadge
                    variant="elevation-muted"
                    className="shrink-0"
                    onClick={() => {
                      setOptimisticLocked(!isLocked)
                      onLock(rule.id, !isLocked)
                    }}
                  >
                    {isLocked ? "Locked" : "Unlocked"}
                  </ButtonBadge>
                  <Select value={displayAction} onValueChange={handleActionChange}>
                    <SelectTrigger hideChevron>
                      <Badge variant={actionOption.variant} className="shrink-0">
                        <SelectValue />
                      </Badge>
                    </SelectTrigger>
                    <SelectContent
                      nullSentinel={{ value: NOTHING_ACTION.value, label: NOTHING_ACTION.label }}
                      sorted
                    >
                      {ACTION_OPTIONS.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {}
                  {SELL_ACTIONS.has(rule.action) && (
                    <Select value={rule.action} onValueChange={handleSellDestinationChange}>
                      <SelectTrigger hideChevron>
                        <Badge variant={actionOption.variant} className="shrink-0">
                          <SelectValue />
                        </Badge>
                      </SelectTrigger>
                      <SelectContent>
                        {SELL_DESTINATION_OPTIONS.map((opt) => (
                          <SelectItem key={opt.value} value={opt.value}>
                            {opt.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}

                  {}
                  {rule.action === "move-to" && (
                    <DestinationCascade
                      destination={rule.destination ?? "bank"}
                      options={destinationOptions}
                      onChange={handleDestinationChange}
                      variant={actionOption.variant}
                    />
                  )}

                  {}
                  {rule.action === "stock" && (
                    <>
                      {!useChain && (
                        <>
                          <StockScopeSelect
                            stockScope={rule.stockScope}
                            destination={rule.destination}
                            onChange={handleStockScopeChange}
                            variant={actionOption.variant}
                          />
                          <NumberBadge
                            editable
                            value={rule.stockQuantity ?? 200}
                            min={1}
                            max={99999}
                            onChange={(val) => onUpdate(rule.id, { stockQuantity: val })}
                            variant={actionOption.variant}
                            className="shrink-0"
                          />
                        </>
                      )}
                      <ButtonBadge
                        variant={useChain ? "accent" : "elevation-muted"}
                        className="shrink-0"
                        onClick={() => handleToggleDestinationChain(!useChain)}
                        aria-label={
                          useChain
                            ? "Switch to single destination"
                            : "Switch to cascading destinations"
                        }
                      >
                        {useChain ? "Single destination" : "Cascading destinations"}
                      </ButtonBadge>
                    </>
                  )}

                  {}
                  {(rule.action === "character-equip" ||
                    rule.action === "use" ||
                    rule.action === "research") && (
                    <CharacterTargetSelect
                      action={rule.action}
                      destination={rule.destination}
                      onChange={handleDestinationChange}
                      variant={actionOption.variant}
                    />
                  )}

                  {}
                  {rule.action === "companion-equip" && (
                    <CompanionTargetSelect
                      destination={rule.destination}
                      onChange={handleDestinationChange}
                      variant={actionOption.variant}
                    />
                  )}
                </div>

                {}
                {rule.action === "stock" && useChain && (
                  <RuleCardDestinationChain
                    chain={rule.destinationChain}
                    destinationOptions={destinationOptions}
                    onChange={handleDestinationChainChange}
                  />
                )}
              </div>
            </div>
          </div>
        )}
      />
      <ItemRuleCardDialogs
        rule={rule}
        isLocked={isLocked}
        notesDialogOpen={notesDialogOpen}
        onNotesDialogOpenChange={setNotesDialogOpen}
        deleteDialogOpen={deleteDialogOpen}
        onDeleteDialogOpenChange={setDeleteDialogOpen}
        onSaveNotes={(notes) => onUpdate(rule.id, { notes })}
        onRemove={onRemove}
      />
    </>
  )
})
