import type { TemperCompanionSkill } from "../temper-companion-skill.page-type.ts"

export const mirriMirriShadowSlash = {
  id: "019e6484-388a-75ec-b19d-139486755ca1",
  pageTypeSlug: "temper-companion-skill",
  slug: "mirri-mirri-shadow-slash",
  key: "mirri-shadow-slash",
  title: "Shadow Slash",
  icon: "/esoui/art/icons/ability_companion_nightblade_002.dds",
  description:
    "Your Companion slashes an enemy, dealing $1 Magic Damage and setting them Off Balance for $$2 seconds.",
  companionId: "mirri",
  abilityId: 156182,
  skillLineId: "companion-mirri-deadly-assassin",
  skillType: "active",
  validRoles: ["dps"],
  skillEffects: "jsonl",
} as const satisfies TemperCompanionSkill
