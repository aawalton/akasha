import type { TemperCompanionSkill } from "../temper-companion-skill.page-type.ts"

export const mirriMirriLifeAbsorption = {
  id: "01a05fd0-1d80-7a23-8fd2-f4b1291171f3",
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
