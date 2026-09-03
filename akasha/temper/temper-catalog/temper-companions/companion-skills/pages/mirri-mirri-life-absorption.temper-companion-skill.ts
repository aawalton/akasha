import type { TemperCompanionSkill } from "../temper-companion-skill.page-type.ts"

export const mirriMirriLifeAbsorption = {
  id: "019e6484-3883-7c4e-aa2f-2a94ca0076cb",
  pageTypeSlug: "temper-companion-skill",
  slug: "mirri-mirri-life-absorption",
  key: "mirri-life-absorption",
  title: "Life Absorption",
  icon: "/esoui/art/icons/ability_companion_nightblade_012.dds",
  description:
    "Your Companion steals an enemy's life force, dealing $1 Magic Damage and healing themselves or an ally around them for $2 Health.",
  companionId: "mirri",
  abilityId: 154790,
  skillLineId: "companion-mirri-soul-thief",
  skillType: "active",
  validRoles: ["dps", "healer", "tank"],
  skillEffects: "jsonl",
} as const satisfies TemperCompanionSkill
