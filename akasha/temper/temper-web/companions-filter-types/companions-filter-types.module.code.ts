import type { BadgeToggleGroupItem } from "@akasha/design-badges/badge-toggle-group"
import type { SortDirection } from "@akasha/design-patterns/sort-types"
import { type TargetArmorId, targetArmor } from "@akasha/temper-character-sources/target-armors"
import { companionBaseRoles } from "@akasha/temper-companions-core/companion-base-roles"
import {
  type CompanionEquipmentQualityId,
  companionEquipmentQualities,
} from "@akasha/temper-companions-core/companion-equipment-qualities"
import { type CompanionId, companions } from "@akasha/temper-companions-core/companions"
import type { SortField } from "../companions-filter-bar/companions-filter-bar.module.code.tsx"

export type TabValue = "plan" | "build" | "browse" | "leaderboard"

export function isValidGearOwnership(value: unknown): value is "owned" | "unowned" {
  return value === "owned" || value === "unowned"
}

export function isValidTab(value: unknown): value is TabValue {
  return value === "plan" || value === "build" || value === "browse" || value === "leaderboard"
}

export const BASE_ROLES = companionBaseRoles.ids

export const LEADERBOARD_TARGET_ARMOR_ITEMS: BadgeToggleGroupItem[] = targetArmor.list.map(
  (ta) => ({
    value: ta.id,
    label: ta.name,
  })
)

export const LEADERBOARD_TARGET_COUNT_ITEMS: BadgeToggleGroupItem[] = [
  { value: "1", label: "Single Target" },
  { value: "3", label: "AOE" },
]

export const LEADERBOARD_TARGET_HEALTH_ITEMS: BadgeToggleGroupItem[] = [
  { value: "full", label: "Full" },
  { value: "execute", label: "Execute" },
]

export type FilterValues = {
  tab: TabValue
  search: string
  roles: readonly string[]
  companion: string | null
  targetArmor: string | null
  targetCount: string | null
  targetHealth: string | null
  sortBy: SortField
  sortDirection: SortDirection
  leaderboardTargetArmor: string | null
  leaderboardTargetCount: string | null
  leaderboardTargetHealth: string | null
}

export function isValidSortField(value: unknown): value is SortField {
  return value === "updated" || value === "name" || value === "score"
}

export function isValidSortDirection(value: unknown): value is SortDirection {
  return value === "asc" || value === "desc"
}

export function isValidRoles(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((r) => BASE_ROLES.some((role) => role === r))
}

export function isValidCompanion(value: unknown): value is CompanionId {
  return typeof value === "string" && value in companions.data && value !== "no-companion"
}

export function isValidTargetArmor(value: unknown): value is TargetArmorId {
  return typeof value === "string" && targetArmor.has(value)
}

export function isValidTargetCount(value: unknown): value is string {
  return value === "1" || value === "3"
}

export function isValidTargetHealth(value: unknown): value is string {
  return value === "full" || value === "execute"
}

export function isValidGearQualities(
  value: unknown
): readonly CompanionEquipmentQualityId[] | undefined {
  if (typeof value === "string") {
    if (value === "") return []
    const arr = value
      .split(",")
      .filter(companionEquipmentQualities.has.bind(companionEquipmentQualities))
      .filter((q) => q !== "no-quality")
    return arr.length > 0 ? arr : undefined
  }
  if (Array.isArray(value)) {
    if (
      value.every(
        (v) => typeof v === "string" && companionEquipmentQualities.has(v) && v !== "no-quality"
      )
    )
      return value
    return undefined
  }
  return undefined
}
