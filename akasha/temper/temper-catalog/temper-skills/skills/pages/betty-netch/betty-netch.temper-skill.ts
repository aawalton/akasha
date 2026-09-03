import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const bettyNetch = {
  id: "019e6f53-9f07-70c1-8c96-1fdcc3754e53",
  pageTypeSlug: "temper-skill",
  slug: "betty-netch",
  title: "Betty Netch",
  key: "betty-netch",
  baseName: "Betty Netch",
  description:
    '"Call a betty netch to your side, which grants you Major Brutality and Sorcery, increasing your Weapon and Spell Damage by |cffffff20|r% for |cffffff22|r seconds.\\n\\nEvery |cffffff5|r seconds, the netch removes |cffffff1|r negative effect from you. If no negative effects are removed you instead increase your damage done by |cffffff5|r% for |cffffff5|r seconds."',
  icon: "/esoui/art/icons/ability_warden_017_a.dds",
  esoSkillId: 86050,
  isMorph: false,
  learnedLevel: 30,
  lineRankNeeded: 30,
  morphIndex: 0,
  rank: 30,
  skillLineId: "warden-animal-companions",
  skillType: "active",
  subcategoryId: "warden-animal-companions",
} as const satisfies TemperSkill
