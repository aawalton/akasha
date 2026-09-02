import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const boundAegis = {
  id: "01a05fd0-437a-7e3b-b4ae-5b4480d7c38c",
  pageTypeSlug: "temper-skill",
  slug: "bound-aegis",
  title: "Bound Aegis",
  key: "bound-aegis",
  baseName: "Bound Armor",
  description:
    '"Protect yourself with the power of Oblivion, creating a suit of Daedric mail that increases your block mitigation by 50% for 3 seconds. The duration is based on your combined Physical and Spell Resistance.\\n\\nWhen slotted on either bar, you gain Minor Protection and Minor Resolve, reducing your damage taken by 5% and increasing your Armor by 2974."',
  icon: "/esoui/art/icons/ability_sorcerer_bound_aegis.dds",
  esoSkillId: 30445,
  isMorph: true,
  learnedLevel: 42,
  lineRankNeeded: 42,
  morphIndex: 2,
  rank: 12,
  skillLineId: "sorcerer-daedric-summoning",
  skillType: "active",
  subcategoryId: "sorcerer-daedric-summoning",
  effects: "jsonl",
} as const satisfies TemperSkill
