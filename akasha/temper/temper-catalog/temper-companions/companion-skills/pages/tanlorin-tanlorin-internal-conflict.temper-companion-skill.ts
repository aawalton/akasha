import type { TemperCompanionSkill } from "../temper-companion-skill.page-type.ts"

export const tanlorinTanlorinInternalConflict = {
  id: "01a05fd0-1d85-7ec3-9bdb-df91fe60dc95",
  pageTypeSlug: "temper-companion-skill",
  slug: "tanlorin-tanlorin-internal-conflict",
  key: "tanlorin-internal-conflict",
  title: "Internal Conflict",
  icon: "/esoui/art/icons/ability_companion_tanlorin_internalconflict.dds",
  description:
    "Your Companion lays claim to an enemy's soul, dealing $1 Magic Damage to their target over $$1 seconds.",
  companionId: "tanlorin",
  abilityId: 214865,
  skillLineId: "companion-tanlorin-empathic-fighter",
  skillType: "active",
  validRoles: ["dps"],
} as const satisfies TemperCompanionSkill
