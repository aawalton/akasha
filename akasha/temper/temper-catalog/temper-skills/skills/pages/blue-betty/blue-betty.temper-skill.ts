import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const blueBetty = {
  id: "019e6245-a5ff-7746-91e5-1bf49f7efa43",
  pageTypeSlug: "temper-skill",
  slug: "blue-betty",
  title: "Blue Betty",
  key: "blue-betty",
  baseName: "Betty Netch",
  description:
    '"Call a betty netch to your side, which restores 4416 Magicka to you over 25 seconds and grants you Major Brutality and Sorcery, increasing your Weapon and Spell Damage by 20%.\\n\\nEvery 5 seconds, the netch removes 1 negative effect from you. If no negative effects are removed you instead increase your damage done by 5% for 5 seconds."',
  icon: "/esoui/art/icons/ability_warden_017.dds",
  esoSkillId: 86057,
  isMorph: true,
  learnedLevel: 30,
  lineRankNeeded: 30,
  morphIndex: 1,
  rank: 8,
  skillLineId: "warden-animal-companions",
  skillType: "active",
  subcategoryId: "warden-animal-companions",
} as const satisfies TemperSkill
