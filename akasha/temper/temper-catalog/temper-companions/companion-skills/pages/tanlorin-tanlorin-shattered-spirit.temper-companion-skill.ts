import type { TemperCompanionSkill } from "../temper-companion-skill.page-type.ts"

export const tanlorinTanlorinShatteredSpirit = {
  id: "019e6484-38a9-7157-a2a3-1c257d3a3e35",
  pageTypeSlug: "temper-companion-skill",
  slug: "tanlorin-tanlorin-shattered-spirit",
  key: "tanlorin-shattered-spirit",
  title: "Shattered Spirit",
  icon: "/esoui/art/icons/ability_companion_tanlorin_shattersoul.dds",
  description:
    "Your Companion burns an enemy from the inside with soulfire, dealing $1 Magic Damage over $$1 seconds. Upon completion, the soulfire overflows and explodes from the enemy, dealing $2 Magic Damage to all enemies near them.",
  companionId: "tanlorin",
  abilityId: 215001,
  skillLineId: "companion-tanlorin-empathic-fighter",
  skillType: "active",
  validRoles: ["dps"],
  skillEffects: "jsonl",
} as const satisfies TemperCompanionSkill
