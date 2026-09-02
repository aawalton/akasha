"use client"

import { Badge } from "@akasha/design-badges/badge"
import { ButtonBadge } from "@akasha/design-badges/button-badge"
import { NumberBadge } from "@akasha/design-badges/number-badge"
import { LayoutLink } from "@akasha/design-layout/router-context"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@akasha/design-primitives/select-control"
import type { ControlledRule } from "@akasha/temper-items-rules-core/inventory-rule-controlled"
import {
  goalIdToValue,
  goalValueToId,
  inventoryRuleGoals,
} from "@akasha/temper-items-rules-core/inventory-rule-goals"
import type { CategoryRule } from "@akasha/temper-items-rules-core/inventory-rule-types"

interface RuleCardPriorityRowProps {
  rule: CategoryRule
  priorityIndex: number
  totalRules: number | undefined
  controlledRulesCount: number | undefined
  isControlled: boolean
  isSortActive: boolean
  isDuplicate: boolean | undefined
  isActive: boolean
  isLocked: boolean
  affectedItemCount: number
  hasAffectedItems: boolean
  countInteractive: boolean
  controlled: ControlledRule | undefined
  onUpdate?: (ruleId: string, patch: Partial<Pick<CategoryRule, "active" | "goal">>) => void
  onReorder?: (ruleId: string, toIndex: number) => void
  onToggleLock: () => void
  openAffectedDialog: () => void
}

export function RuleCardPriorityRow({
  rule,
  priorityIndex,
  totalRules,
  controlledRulesCount,
  isControlled,
  isSortActive,
  isDuplicate,
  isActive,
  isLocked,
  affectedItemCount,
  hasAffectedItems,
  countInteractive,
  controlled,
  onUpdate,
  onReorder,
  onToggleLock,
  openAffectedDialog,
}: RuleCardPriorityRowProps) {
  return (
    <div className="flex items-center gap-1.5">
      {isControlled ? (
        <div inert className="contents">
          <NumberBadge
            editable
            value={priorityIndex}
            min={priorityIndex}
            max={priorityIndex}
            onChange={() => {}}
            variant="elevation-muted"
            className="shrink-0"
          />
        </div>
      ) : isSortActive ? (
        <Badge variant="elevation-muted" className="shrink-0 tabular-nums">
          #{priorityIndex}
        </Badge>
      ) : (
        <NumberBadge
          editable
          value={priorityIndex}
          min={1 + (controlledRulesCount ?? 0)}
          max={totalRules ?? priorityIndex}
          onChange={(val) => onReorder?.(rule.id, val - 1 - (controlledRulesCount ?? 0))}
          variant="elevation-muted"
          className="shrink-0"
        />
      )}
      {!isControlled && (
        <Select
          value={goalValueToId(rule.goal)}
          onValueChange={(val) => onUpdate?.(rule.id, { goal: goalIdToValue(val) })}
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
      )}
      {isControlled && controlled ? (
        <>
          <Badge variant="accent" className="shrink-0 cursor-pointer" asChild>
            <LayoutLink href={controlled.settingsPath}>Active</LayoutLink>
          </Badge>
          <Badge variant="elevation-muted" className="shrink-0 cursor-pointer" asChild>
            <LayoutLink href={controlled.settingsPath}>Controlled</LayoutLink>
          </Badge>
        </>
      ) : isDuplicate ? (
        <Badge variant="elevation-muted" className="shrink-0">
          Duplicate
        </Badge>
      ) : isLocked ? (
        <Badge variant={isActive ? "accent" : "elevation-muted"} className="shrink-0">
          {isActive ? "Active" : "Inactive"}
        </Badge>
      ) : (
        <ButtonBadge
          variant={isActive ? "accent" : "elevation-muted"}
          className="shrink-0"
          onClick={() => onUpdate?.(rule.id, { active: !isActive })}
        >
          {isActive ? "Active" : "Inactive"}
        </ButtonBadge>
      )}
      {!isControlled && (
        <ButtonBadge variant="elevation-muted" className="shrink-0" onClick={onToggleLock}>
          {isLocked ? "Locked" : "Unlocked"}
        </ButtonBadge>
      )}
      {hasAffectedItems &&
        (countInteractive ? (
          <ButtonBadge
            variant="elevation-muted"
            className="shrink-0 tabular-nums"
            onClick={openAffectedDialog}
          >
            {affectedItemCount} {affectedItemCount === 1 ? "item" : "items"}
          </ButtonBadge>
        ) : (
          <Badge variant="elevation-muted" className="shrink-0 tabular-nums">
            {affectedItemCount} {affectedItemCount === 1 ? "item" : "items"}
          </Badge>
        ))}
    </div>
  )
}
