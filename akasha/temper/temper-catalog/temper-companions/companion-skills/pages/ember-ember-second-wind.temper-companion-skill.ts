import type { TemperCompanionSkill } from "../temper-companion-skill.page-type.ts"

export const emberEmberSecondWind = {
  id: "019e6484-3862-72b6-b3a5-3a3f002a12cc",
  pageTypeSlug: "temper-companion-skill",
  slug: "ember-ember-second-wind",
  key: "ember-second-wind",
  title: "Second Wind",
  icon: "/esoui/art/icons/ability_companion_sorcerer_dark_exchange.dds",
  description:
    "Your Companion uses their backup resources, reducing the cooldown of all their other abilities by 5 seconds.",
  companionId: "ember",
  abilityId: 166068,
  skillLineId: "companion-ember-playful-schemer",
  skillType: "active",
  skillEffects: "jsonl",
} as const satisfies TemperCompanionSkill
