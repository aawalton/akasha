import { companionArmorSlots } from "../companion-armor-slots/companion-armor-slots.module.code.ts"
import type { CompanionArmorWeight } from "../companion-armor-weights/companion-armor-weights.module.code.ts"
import type { CompanionState } from "../companion-types/companion-types.module.code.ts"
import {
  type CompanionWeaponTypeId,
  ONE_HANDED_MELEE_WEAPONS,
} from "../companion-weapon-types/companion-weapon-types.module.code.ts"
import {
  type CompanionSkillLineId,
  companionSkillLines,
} from "../skill-lines-by-companion/skill-lines-by-companion.module.code.ts"

const WEAPON_SKILL_LINE: Partial<Record<CompanionWeaponTypeId, CompanionSkillLineId>> = {
  greatsword: "weapon-two-handed",
  battleaxe: "weapon-two-handed",
  maul: "weapon-two-handed",
  bow: "weapon-bow",
  "inferno-staff": "weapon-destruction-staff",
  "ice-staff": "weapon-destruction-staff",
  "lightning-staff": "weapon-destruction-staff",
  "restoration-staff": "weapon-restoration-staff",
}

type ActualArmorWeight = Exclude<CompanionArmorWeight, "no-weight">

const ARMOR_SKILL_LINE: Record<ActualArmorWeight, CompanionSkillLineId> = {
  light: "armor-light",
  medium: "armor-medium",
  heavy: "armor-heavy",
}

function getAvailableCompanionSkillLines(
  equipment: CompanionState["equipment"]
): Set<CompanionSkillLineId> {
  const available = new Set<CompanionSkillLineId>()

  const mainHand = equipment.weapons["main-hand"]
  const offHand = equipment.weapons["off-hand"]
  const mainHandType = mainHand.itemType === "weapon" ? mainHand.data.type : null
  const offHandType = offHand.itemType === "weapon" ? offHand.data.type : null

  if (mainHandType != null) {
    const directSkillLine = WEAPON_SKILL_LINE[mainHandType]
    if (directSkillLine != null) {
      available.add(directSkillLine)
    } else if (ONE_HANDED_MELEE_WEAPONS.includes(mainHandType)) {
      if (offHandType === "shield") {
        available.add("weapon-one-hand-shield")
      } else if (offHandType != null && ONE_HANDED_MELEE_WEAPONS.includes(offHandType)) {
        available.add("weapon-dual-wield")
      }
    }
  }

  const weightCounts = new Map<ActualArmorWeight, number>([
    ["light", 0],
    ["medium", 0],
    ["heavy", 0],
  ])

  for (const slot of companionArmorSlots.list) {
    const armorSlot = equipment.armor[slot.id]
    if (armorSlot.itemType === "armor" && armorSlot.data.weight !== "no-weight") {
      const weight = armorSlot.data.weight
      weightCounts.set(weight, (weightCounts.get(weight) ?? 0) + 1)
    }
  }

  for (const [weight, count] of weightCounts) {
    if (count >= 5) {
      available.add(ARMOR_SKILL_LINE[weight])
    }
  }

  return available
}

export function isCompanionSkillAvailable(
  skill: { skillLineId: CompanionSkillLineId },
  equipment: CompanionState["equipment"]
): boolean {
  const skillLine = companionSkillLines.data[skill.skillLineId]
  const category = skillLine.category

  if (category === "class" || category === "guild") {
    return true
  }

  const availableSkillLines = getAvailableCompanionSkillLines(equipment)
  return availableSkillLines.has(skill.skillLineId)
}
