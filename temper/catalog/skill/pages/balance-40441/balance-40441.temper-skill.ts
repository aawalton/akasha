import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const balance40441 = {
  id: "019e6f53-9edf-70fe-ba87-aa41eba6223c",
  type: "page-type/temper-skill",
  slug: "balance-40441",
  title: "Balance",
  key: "balance-40441",
  baseName: "Equilibrium",
  description:
    "Barter with Oblivion to trade vitality for power, sacrificing your Health in exchange for |cffffff3000|r Magicka.\n\nAfter the exchange is complete, you gain Major Resolve for |cffffff30|r seconds, increasing your Physical and Spell Resistance by |cffffff5948|r.\n\nThe exchange reduces your healing done and damage shield strength by |cffffff50|r% for |cffffff4|r seconds.",
  icon: "/esoui/art/icons/ability_mageguild_003_b.dds",
  esoSkillId: 40441,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 8,
  morphIndex: 2,
  rank: 8,
  skillLineId: "temper-skill-line/guild-mages-guild",
  skillType: "temper-skill-type/active",
  hashPlace: 69,
  createdAt: "2026-05-28T16:03:31.679Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 3000 (Constant)",
    "<<2>> = Major Resolve (Constant)",
    "<<3>> = 27 seconds (Constant)",
    "<<4>> = 5948 (Constant)",
    "<<5>> = 50% (Constant)",
    "<<6>> = 4 seconds (Constant)",
  ],
} as const satisfies TemperSkill
