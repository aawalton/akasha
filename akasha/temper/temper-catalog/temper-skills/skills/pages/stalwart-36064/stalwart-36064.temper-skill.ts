import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const stalwart36064 = {
  id: "019e6f53-a7ab-77f6-b730-0d99eb2a87c4",
  pageTypeSlug: "temper-skill",
  slug: "stalwart-36064",
  title: "Stalwart",
  key: "stalwart-36064",
  baseName: "Stalwart",
  description:
    '"Increases your Max Stamina by |cffffff500|r.\\n\\nWhen you take damage, you gain |cffffff1|r Ultimate.  This effect can occur once every |cffffff10|r seconds."',
  icon: "/esoui/art/icons/ability_sorcerer_018.dds",
  esoSkillId: 36064,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 10,
  morphIndex: 0,
  rank: 10,
  skillLineId: "racial-nord-skills",
  skillType: "passive",
  subcategoryId: "racial-nord-skills",
} as const satisfies TemperSkill
