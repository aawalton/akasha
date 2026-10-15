import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const boundAegis = {
  id: "019e6245-a602-797f-ae20-3a1aea74def8",
  type: "page-type/temper-skill",
  slug: "bound-aegis",
  title: "Bound Aegis",
  key: "bound-aegis",
  baseName: "Bound Armor",
  description:
    "Protect yourself with the power of Oblivion, creating a suit of Daedric mail that increases your block mitigation by 50% for 3 seconds. The duration is based on your combined Physical and Spell Resistance.\n\nWhen slotted on either bar, you gain Minor Protection and Minor Resolve, reducing your damage taken by 5% and increasing your Armor by 2974.",
  icon: "/esoui/art/icons/ability_sorcerer_bound_aegis.dds",
  esoSkillId: 30445,
  isMorph: true,
  learnedLevel: 42,
  lineRankNeeded: 42,
  morphIndex: 2,
  rank: 12,
  skillLineId: "temper-skill-line/sorcerer-daedric-summoning",
  skillType: "temper-skill-type/active",
  effects: "jsonl",
  hashPlace: 152,
  createdAt: "2026-05-26T03:13:12.194Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 50% (Constant)",
    "<<2>> = 1.32E-5 Health + 2.78104 (Health, SingleTarget, Direct, R2 = 0.5958)",
    "<<3>> = Minor Protection (Constant)",
    "<<4>> = Minor Resolve (Constant)",
    "<<5>> = 5% (Constant)",
    "<<6>> = 2974 (Constant)",
  ],
} as const satisfies TemperSkill
