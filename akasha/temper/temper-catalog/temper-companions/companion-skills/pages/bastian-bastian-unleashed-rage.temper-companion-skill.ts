import type { TemperCompanionSkill } from "../temper-companion-skill.page-type.ts"

export const bastianBastianUnleashedRage = {
  id: "01a05fd0-1d7a-74dc-adb3-d23b1a5432ff",
  pageTypeSlug: "temper-companion-skill",
  slug: "bastian-bastian-unleashed-rage",
  key: "bastian-unleashed-rage",
  title: "Unleashed Rage",
  icon: "/esoui/art/icons/ability_companion_ultimate_bastian_001.dds",
  description:
    "Your Companion builds up rage, then unleashes it in a devastating explosion around them. The explosion deals $1 Flame Damage to enemies and stuns them for $$2 seconds, while also releasing four lines of fire in a cross formation over 10 seconds that deal an additional $2 Flame Damage to any enemy they hit.",
  companionId: "bastian",
  abilityId: 157016,
  skillLineId: "companion-bastian",
  skillType: "ultimate",
  validRoles: ["dps"],
} as const satisfies TemperCompanionSkill
