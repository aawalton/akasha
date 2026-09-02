import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const hardenedWard29489 = {
  id: "01a05fd0-dca6-732b-a7ca-2b3af8e37150",
  pageTypeSlug: "temper-skill",
  slug: "hardened-ward-29489",
  title: "Hardened Ward",
  key: "hardened-ward-29489",
  baseName: "Conjured Ward",
  description:
    '"Conjure globes of Daedric energy for protection, granting a damage shield for you and your pets that absorbs |cffffff10380|r damage for |cffffff6|r seconds.\\n\\nThis ability scales off the higher of your Max Health or Magicka and the shield is capped at |cffffff72|r% of your Max Health."',
  icon: "/esoui/art/icons/ability_sorcerer_typhoon.dds",
  esoSkillId: 29489,
  isMorph: true,
  learnedLevel: 30,
  lineRankNeeded: 30,
  morphIndex: 1,
  rank: 30,
  skillLineId: "sorcerer-daedric-summoning",
  skillType: "active",
  subcategoryId: "sorcerer-daedric-summoning",
} as const satisfies TemperSkill
