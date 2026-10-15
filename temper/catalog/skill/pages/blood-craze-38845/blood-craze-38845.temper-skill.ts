import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const bloodCraze38845 = {
  id: "019e6f53-9f45-785d-822f-6fc15b780376",
  type: "page-type/temper-skill",
  slug: "blood-craze-38845",
  title: "Blood Craze",
  key: "blood-craze-38845",
  baseName: "Twin Slashes",
  description:
    "Slice an enemy with both weapons to cause deep lacerations, dealing |cffffff2018|r Bleed Damage with each weapon and causing them to bleed for an additional |cffffff11420|r Bleed Damage over |cffffff20|r seconds.\n\nYou heal for |cffffff1131|r Health anytime this ability deals damage.",
  icon: "/esoui/art/icons/ability_dualwield_001_b.dds",
  esoSkillId: 38845,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 4,
  morphIndex: 2,
  rank: 4,
  skillLineId: "temper-skill-line/weapon-dual-wield",
  skillType: "temper-skill-type/active",
  hashPlace: 115,
  createdAt: "2026-05-28T16:03:31.781Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.025825 MaxStat + 0.271163 MaxPower (Ultimate, ratio = 10.50, Dmg, Bleed, SingleTarget, Direct, Melee, R2 = 1)",
    "<<2>> = 0.0156088 MaxStat + 0.162726 MaxPower - 2.99952 (Ultimate, ratio = 10.43, Dmg, Bleed, SingleTarget, DOT, 18s duration, 2s tick, R2 = 0.999995)",
    "<<3>> = 20 seconds (Constant)",
    "<<4>> = 0.0156088 MaxStat + 0.162726 MaxPower - 2.99952 (Ultimate, ratio = 10.43, Heal, SingleTarget, Direct, 2s tick, R2 = 0.999995)",
  ],
} as const satisfies TemperSkill
