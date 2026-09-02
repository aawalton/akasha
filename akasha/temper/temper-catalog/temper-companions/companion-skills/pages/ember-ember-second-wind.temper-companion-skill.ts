import type { TemperCompanionSkill } from "../temper-companion-skill.page-type.ts"

export const emberEmberSecondWind = {
  id: "01a05fd0-1d7b-7a38-b0b6-5414216f3aa8",
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
