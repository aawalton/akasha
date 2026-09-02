import type { TemperSkill } from "../temper-skill.page-type.ts"

export const masterRitualist31747 = {
  id: "01a05fd1-2df8-7959-859e-2ea40335350e",
  pageTypeSlug: "temper-skill",
  slug: "master-ritualist-31747",
  title: "Master Ritualist",
  key: "master-ritualist-31747",
  baseName: "Master Ritualist",
  description:
    '"Increases resurrection speed by |cffffff10|r%. \\n\\nResurrected allies return with |cffffff50|r% more Health. \\n\\nGives you a |cffffff50|r% chance to fill an empty Soul Gem after each successful resurrection."',
  icon: "/esoui/art/icons/ability_templar_026.dds",
  esoSkillId: 31747,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 39,
  morphIndex: 0,
  rank: 39,
  skillLineId: "templar-restoring-light",
  skillType: "passive",
  subcategoryId: "templar-restoring-light",
} as const satisfies TemperSkill
