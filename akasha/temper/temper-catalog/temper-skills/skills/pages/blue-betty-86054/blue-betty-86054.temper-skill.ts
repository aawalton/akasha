import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const blueBetty86054 = {
  id: "019e6f53-9f63-7515-96a7-07853911fc48",
  pageTypeSlug: "temper-skill",
  slug: "blue-betty-86054",
  title: "Blue Betty",
  key: "blue-betty-86054",
  baseName: "Betty Netch",
  description:
    '"Call a betty netch to your side, which restores |cffffff4992|r Magicka to you over |cffffff25|r seconds and grants you Major Brutality and Sorcery, increasing your Weapon and Spell Damage by |cffffff20|r%.\\n\\nEvery |cffffff5|r seconds, the netch removes |cffffff1|r negative effect from you. If no negative effects are removed you instead increase your damage done by |cffffff5|r% for |cffffff5|r seconds."',
  icon: "/esoui/art/icons/ability_warden_017.dds",
  esoSkillId: 86054,
  isMorph: true,
  learnedLevel: 30,
  lineRankNeeded: 30,
  morphIndex: 1,
  rank: 30,
  skillLineId: "warden-animal-companions",
  skillType: "active",
  subcategoryId: "warden-animal-companions",
} as const satisfies TemperSkill
