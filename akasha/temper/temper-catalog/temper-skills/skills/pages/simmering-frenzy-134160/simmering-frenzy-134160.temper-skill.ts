import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const simmeringFrenzy134160 = {
  id: "019e6f53-a723-7c71-977d-1be6d9bff1e7",
  pageTypeSlug: "temper-skill",
  slug: "simmering-frenzy-134160",
  title: "Simmering Frenzy",
  key: "simmering-frenzy-134160",
  baseName: "Blood Frenzy",
  description:
    '"Allow your monstrous appetites to take hold, increasing your Weapon and Spell Damage by |cffffff80|r every |cffffff2|r seconds, up to |cffffff5|r times.\\n\\nWhile toggled on, the Health cost of this ability increases by |cffffff360|r per stack and you cannot be healed by anyone but yourself, your pets, or your Companions."',
  icon: "/esoui/art/icons/ability_u26_vampire_02_a.dds",
  esoSkillId: 134160,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 2,
  morphIndex: 1,
  rank: 2,
  skillLineId: "world-vampire",
  skillType: "active",
  subcategoryId: "world-vampire",
} as const satisfies TemperSkill
