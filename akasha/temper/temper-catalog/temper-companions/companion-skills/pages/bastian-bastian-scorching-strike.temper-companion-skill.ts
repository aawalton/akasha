import type { TemperCompanionSkill } from "../temper-companion-skill.page-type.ts"

export const bastianBastianScorchingStrike = {
  id: "019e6484-3851-7f30-8fd9-32c2f824b762",
  pageTypeSlug: "temper-companion-skill",
  slug: "bastian-bastian-scorching-strike",
  key: "bastian-scorching-strike",
  title: "Scorching Strike",
  icon: "/esoui/art/icons/ability_companion_dragonknight_003.dds",
  description:
    "Your Companion slashes an enemy with flame, dealing $1 Flame Damage and an additional $2 Flame Damage over $$2 seconds.",
  companionId: "bastian",
  abilityId: 154923,
  skillLineId: "companion-bastian-ardent-warrior",
  skillType: "active",
  validRoles: ["dps"],
  skillEffects: "jsonl",
} as const satisfies TemperCompanionSkill
