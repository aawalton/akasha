import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const surge = {
  id: "019e6f53-a7fa-7c54-a9eb-1e24b9d8faeb",
  pageTypeSlug: "temper-skill",
  slug: "surge",
  title: "Surge",
  key: "surge",
  baseName: "Surge",
  description:
    '"Invoke Meridia\'s name to gain Major Brutality and Sorcery, increasing your Weapon and Spell Damage by |cffffff20|r% for |cffffff33|r seconds.\\n\\nWhile active, dealing Critical Damage heals you for |cffffff2601|r Health. This effect can occur once every |cffffff1|r second."',
  icon: "/esoui/art/icons/ability_sorcerer_surge.dds",
  esoSkillId: 23670,
  isMorph: false,
  learnedLevel: 30,
  lineRankNeeded: 30,
  morphIndex: 0,
  rank: 30,
  skillLineId: "sorcerer-storm-calling",
  skillType: "active",
  subcategoryId: "sorcerer-storm-calling",
} as const satisfies TemperSkill
