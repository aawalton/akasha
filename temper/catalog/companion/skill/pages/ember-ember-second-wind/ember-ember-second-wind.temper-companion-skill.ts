import type { TemperCompanionSkill } from "akasha/temper/catalog/companion/skill/temper-companion-skill.page-type.types.ts"

export const emberEmberSecondWind = {
  id: "019e6484-3862-72b6-b3a5-3a3f002a12cc",
  type: "page-type/temper-companion-skill",
  slug: "ember-ember-second-wind",
  key: "ember-second-wind",
  title: "Second Wind",
  icon: "/esoui/art/icons/ability_companion_sorcerer_dark_exchange.dds",
  description:
    "Your Companion uses their backup resources, reducing the cooldown of all their other abilities by 5 seconds.",
  companionId: "temper-eso-companion/ember",
  abilityId: 166068,
  skillLineId: "temper-companion-skill-line/companion-ember-playful-schemer",
  skillType: "temper-skill-type/active",
  skillEffects: "jsonl",
  createdAt: "2026-05-26T13:40:47.330Z",
  updatedAt: "2026-09-22T20:39:10.000Z",
} as const satisfies TemperCompanionSkill
