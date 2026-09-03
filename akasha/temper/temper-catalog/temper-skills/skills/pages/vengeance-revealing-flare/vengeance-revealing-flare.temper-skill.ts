import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const vengeanceRevealingFlare = {
  id: "019e6f53-a968-7206-b7ed-e38559433a56",
  pageTypeSlug: "temper-skill",
  slug: "vengeance-revealing-flare",
  title: "Vengeance Revealing Flare",
  key: "vengeance-revealing-flare",
  baseName: "Vengeance Revealing Flare",
  description:
    '"Launch a blinding flare, revealing stealthed and invisible enemies in the target area. Exposed enemies take |cffffff11760|r Magic Damage and cannot return to stealth or invisibility for |cffffff6|r seconds."',
  icon: "/esoui/art/icons/ability_ava_revealing_flare.dds",
  esoSkillId: 245049,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "vengeance-alliance-war-support",
  skillType: "active",
  subcategoryId: "vengeance-alliance-war-support",
} as const satisfies TemperSkill
