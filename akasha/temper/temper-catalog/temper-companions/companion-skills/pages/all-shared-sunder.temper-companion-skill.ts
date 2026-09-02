import type { TemperCompanionSkill } from "../temper-companion-skill.page-type.ts"

export const allSharedSunder = {
  id: "01a05fd0-1d73-7887-ab9e-4ffb3e961ce4",
  pageTypeSlug: "temper-companion-skill",
  slug: "all-shared-sunder",
  key: "shared-sunder",
  title: "Sunder",
  icon: "/esoui/art/icons/ability_companion_2handed_002.dds",
  description:
    "Your Companion slices all enemies in front of them with a mighty swing, dealing $1 Physical Damage and an additional $2 Physical Damage over $$2 seconds.",
  companionId: "all",
  abilityId: 152512,
  skillLineId: "weapon-two-handed",
  skillType: "active",
  validRoles: ["dps"],
  skillEffects: "jsonl",
} as const satisfies TemperCompanionSkill
