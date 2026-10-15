import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const bolsteringDarkness36493 = {
  id: "019e6f53-9f67-7381-b388-dcd9d6ccb3d8",
  type: "page-type/temper-skill",
  slug: "bolstering-darkness-36493",
  title: "Bolstering Darkness",
  key: "bolstering-darkness-36493",
  baseName: "Consuming Darkness",
  description:
    "Conjure a ring of shadow, reducing the Movement Speed of enemies by |cffffff70|r% and granting you and your allies Major Protection for |cffffff10|r seconds, reducing your damage taken by |cffffff10|r%.\n\nAllies in the area can activate the Hidden Refresh synergy, granting them invisibility, increasing their Movement Speed by |cffffff70|r%, and healing them for |cffffff28640|r Health over |cffffff4|r seconds.",
  icon: "/esoui/art/icons/ability_nightblade_015_a.dds",
  esoSkillId: 36493,
  isMorph: true,
  learnedLevel: 12,
  lineRankNeeded: 12,
  morphIndex: 1,
  rank: 12,
  skillLineId: "temper-skill-line/nightblade-shadow",
  skillType: "temper-skill-type/ultimate",
  hashPlace: 137,
  createdAt: "2026-05-28T16:03:31.815Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 70% (Constant)",
    "<<2>> = Major Protection (Constant)",
    "<<3>> = 7 seconds (Constant)",
    "<<4>> = 10% (Constant)",
    "<<5>> = Hidden Refresh (Constant)",
    "<<6>> = 70% (Constant)",
    "<<7>> = 0.081 MaxStat + 0.85032 MaxPower (Ultimate, ratio = 10.50, Heal, SingleTarget, DOT, 4s duration, 1s tick, R2 = 1)",
    "<<8>> = 4 seconds (Constant)",
  ],
} as const satisfies TemperSkill
