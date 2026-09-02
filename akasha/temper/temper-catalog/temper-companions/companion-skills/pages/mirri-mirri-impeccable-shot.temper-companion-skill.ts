import type { TemperCompanionSkill } from "../temper-companion-skill.page-type.ts"

export const mirriMirriImpeccableShot = {
  id: "01a05fd0-1d80-752c-b32d-6c261ef658c2",
  pageTypeSlug: "temper-companion-skill",
  slug: "mirri-mirri-impeccable-shot",
  key: "mirri-impeccable-shot",
  title: "Impeccable Shot",
  icon: "/esoui/art/icons/ability_companion_ultimate_mirri_001.dds",
  description:
    "Your Companion marks an enemy and exposes their weakness, causing them to take 20% more damage for $$2 seconds. While the enemy is exposed they build up to a single killing shot, unleashing a massive bolt that deals $1 Physical Damage.",
  companionId: "mirri",
  abilityId: 157259,
  skillLineId: "companion-mirri",
  skillType: "ultimate",
  validRoles: ["dps", "support"],
  skillEffects: "jsonl",
} as const satisfies TemperCompanionSkill
