import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const bloodFrenzy = {
  id: "019e6f53-9f4a-765b-b07f-afebe9929b3e",
  pageTypeSlug: "temper-skill",
  slug: "blood-frenzy",
  title: "Blood Frenzy",
  key: "blood-frenzy",
  baseName: "Blood Frenzy",
  description:
    '"Allow your monstrous appetites to take hold, increasing your Weapon and Spell Damage by |cffffff60|r every |cffffff2|r seconds, up to |cffffff5|r times.\\n\\nWhile toggled on, the Health cost of this ability increases by |cffffff360|r per stack and you cannot be healed by anyone but yourself, your pets, or your Companions."',
  icon: "/esoui/art/icons/ability_u26_vampire_02.dds",
  esoSkillId: 132141,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 2,
  morphIndex: 0,
  rank: 2,
  skillLineId: "world-vampire",
  skillType: "active",
  subcategoryId: "world-vampire",
} as const satisfies TemperSkill
