"use client"

import { Badge } from "@akasha/design-badges/badge"
import {
  BadgeToggleGroup,
  type BadgeToggleGroupItem,
} from "@akasha/design-badges/badge-toggle-group"
import { Popover, PopoverContent, PopoverTrigger } from "@akasha/design-primitives/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@akasha/design-primitives/select-control"
import { Switch } from "@akasha/design-primitives/switch-control"
import { Text } from "@akasha/design-primitives/text-body"
import type { CanLevelMorphsCondition } from "@akasha/temper-items-rules-core/can-level-morphs-filter-types"
import type { CharEligibility } from "@akasha/temper-items-rules-core/inventory-rule-types"
import type {
  RequiredSkillLinesCondition,
  RequiredSkillLinesMode,
} from "@akasha/temper-items-rules-core/required-skill-lines-filter-types"
import { skillLines } from "@akasha/temper-skill-lines/skill-lines"
import type { ReactNode } from "react"

const SKILL_LINE_OPTIONS: readonly BadgeToggleGroupItem[] = skillLines.list
  .filter((sl) => sl.esoSkillLineId > 0)
  .slice()
  .sort((a, b) => a.displayOrder - b.displayOrder)
  .map((sl) => ({ value: sl.id, label: sl.name }))

const MODE_OPTIONS: readonly { value: RequiredSkillLinesMode; label: string }[] = [
  { value: "all-maxed", label: "all maxed" },
  { value: "any-not-maxed", label: "any below max" },
]

function isEligibilityEmpty(eligibility: CharEligibility | undefined): boolean {
  if (eligibility === undefined) return true
  const hasSkillLines =
    eligibility.requiredSkillLines !== undefined &&
    eligibility.requiredSkillLines.skillLineIds.length > 0
  const hasCanLevel = eligibility.canLevelMorphs !== undefined
  return !hasSkillLines && !hasCanLevel
}

function withRequiredSkillLines(
  eligibility: CharEligibility | undefined,
  next: RequiredSkillLinesCondition | undefined
): CharEligibility | undefined {
  const merged: CharEligibility = {
    ...eligibility,
    ...(next !== undefined ? { requiredSkillLines: next } : { requiredSkillLines: undefined }),
  }
  return isEligibilityEmpty(merged) ? undefined : merged
}

function withCanLevelMorphs(
  eligibility: CharEligibility | undefined,
  next: CanLevelMorphsCondition | undefined
): CharEligibility | undefined {
  const merged: CharEligibility = {
    ...eligibility,
    ...(next !== undefined ? { canLevelMorphs: next } : { canLevelMorphs: undefined }),
  }
  return isEligibilityEmpty(merged) ? undefined : merged
}

interface RuleCardDestinationTierEligibilityProps {
  charEligibility: CharEligibility | undefined
  onChange: (next: CharEligibility | undefined) => void
}

export function RuleCardDestinationTierEligibility({
  charEligibility,
  onChange,
}: RuleCardDestinationTierEligibilityProps): ReactNode {
  const requiredSkillLines = charEligibility?.requiredSkillLines
  const canLevelMorphs = charEligibility?.canLevelMorphs

  const selectedItems: readonly BadgeToggleGroupItem[] =
    requiredSkillLines?.skillLineIds
      .map((id) => SKILL_LINE_OPTIONS.find((o) => o.value === id))
      .filter((opt): opt is BadgeToggleGroupItem => opt !== undefined) ?? []

  const isActive = !isEligibilityEmpty(charEligibility)

  const summaryParts: string[] = []
  if (canLevelMorphs !== undefined) summaryParts.push("can-level")
  if (selectedItems.length > 0) {
    summaryParts.push(`${selectedItems.length} skill line${selectedItems.length === 1 ? "" : "s"}`)
  }
  const triggerLabel = isActive ? `Eligibility — ${summaryParts.join(", ")}` : "+ Eligibility"

  function handleCanLevelToggle(checked: boolean) {
    const next: CanLevelMorphsCondition | undefined = checked ? { mode: "can-level" } : undefined
    onChange(withCanLevelMorphs(charEligibility, next))
  }

  function handleSkillLineIdsChange(selected: readonly BadgeToggleGroupItem[]) {
    const currentMode: RequiredSkillLinesMode = requiredSkillLines?.mode ?? "all-maxed"
    if (selected.length === 0) {
      onChange(withRequiredSkillLines(charEligibility, undefined))
      return
    }
    const next: RequiredSkillLinesCondition = {
      skillLineIds: selected.map((s) => s.value),
      mode: currentMode,
    }
    onChange(withRequiredSkillLines(charEligibility, next))
  }

  function handleSkillLinesModeChange(value: string) {
    const mode: RequiredSkillLinesMode = value === "any-not-maxed" ? "any-not-maxed" : "all-maxed"
    const ids = requiredSkillLines?.skillLineIds ?? []
    if (ids.length === 0) return
    onChange(withRequiredSkillLines(charEligibility, { skillLineIds: ids, mode }))
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Badge
          variant={isActive ? "accent" : "elevation-muted"}
          className="shrink-0 cursor-pointer"
          asChild
        >
          <span>{triggerLabel}</span>
        </Badge>
      </PopoverTrigger>
      <PopoverContent align="start" className="flex flex-col gap-3">
        <div className="flex items-center justify-between gap-2">
          <Text variant="hint" className="font-medium">
            Can Level Morphs
          </Text>
          <Switch
            checked={canLevelMorphs !== undefined}
            onCheckedChange={handleCanLevelToggle}
            aria-label="Toggle can level morphs eligibility"
          />
        </div>
        <Text variant="hint" className="font-medium">
          Required Skill Lines — Mode
        </Text>
        <Select
          value={requiredSkillLines?.mode ?? "all-maxed"}
          onValueChange={handleSkillLinesModeChange}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {MODE_OPTIONS.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Text variant="hint" className="font-medium">
          Required Skill Lines
        </Text>
        <BadgeToggleGroup
          items={SKILL_LINE_OPTIONS}
          value={selectedItems}
          onSelect={handleSkillLineIdsChange}
          unselectedVariant="elevation"
          wrap
        />
      </PopoverContent>
    </Popover>
  )
}
