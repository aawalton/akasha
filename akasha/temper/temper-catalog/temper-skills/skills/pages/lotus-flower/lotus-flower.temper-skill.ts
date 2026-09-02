import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const lotusFlower = {
  id: "01a05fd1-2ded-71bb-b5a3-be5a3d9c359e",
  pageTypeSlug: "temper-skill",
  slug: "lotus-flower",
  title: "Lotus Flower",
  key: "lotus-flower",
  baseName: "Lotus Flower",
  description:
    '"Embrace the lotus blessing, causing your Light Attacks to restore |cffffff1346|r Health and your fully-charged Heavy Attacks to restore |cffffff3097|r Health to you or a nearby ally for |cffffff20|r seconds.\\n\\nWhile active you gain Major Prophecy and Savagery, increasing your Spell and Weapon Critical rating by |cffffff2629|r."',
  icon: "/esoui/art/icons/ability_warden_009.dds",
  esoSkillId: 85539,
  isMorph: false,
  learnedLevel: 30,
  lineRankNeeded: 30,
  morphIndex: 0,
  rank: 30,
  skillLineId: "warden-green-balance",
  skillType: "active",
  subcategoryId: "warden-green-balance",
} as const satisfies TemperSkill
