import type { TemperCompanionSkill } from "../temper-companion-skill.page-type.ts"

export const mirriMirriLifeSiphon = {
  id: "01a05fd0-1d80-77f6-88f0-e1ffe6d47152",
  pageTypeSlug: "temper-companion-skill",
  slug: "mirri-mirri-life-siphon",
  key: "mirri-life-siphon",
  title: "Life Siphon",
  icon: "/esoui/art/icons/ability_companion_nightblade_013.dds",
  description:
    "Your Companion siphons the vigor from the blood of enemies nearby, dealing $1 Magic Damage and healing themselves and their allies for $2 Health.",
  companionId: "mirri",
  abilityId: 157207,
  skillLineId: "companion-mirri-soul-thief",
  skillType: "active",
  validRoles: ["dps", "healer", "tank"],
  skillEffects: "jsonl",
} as const satisfies TemperCompanionSkill
