import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const vengeanceFatewovenArmor = {
  id: "019e6f53-a909-7a44-b1b1-d78183e84e5c",
  pageTypeSlug: "temper-skill",
  slug: "vengeance-fatewoven-armor",
  title: "Vengeance Fatewoven Armor",
  key: "vengeance-fatewoven-armor",
  baseName: "Vengeance Fatewoven Armor",
  description:
    '"Forge defiant runic armor around you, granting Major Resolve for |cffffff20|r seconds, increasing your Armor by |cffffff5948|r and apply Minor Breach to up to 3 nearby enemies for |cffffff20|r seconds, reducing their Armor by |cffffff2974|r."',
  icon: "/esoui/art/icons/ability_arcanist_009.dds",
  esoSkillId: 238256,
  isMorph: false,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "vengeance-arcanist-soldier-of-apocrypha",
  skillType: "active",
  subcategoryId: "vengeance-arcanist-soldier-of-apocrypha",
} as const satisfies TemperSkill
