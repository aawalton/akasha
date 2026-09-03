import type { TemperScribedSkill } from "../temper-scribed-skill.page-type.ts"

export const scribedBannerBearerMultiTarget = {
  id: "019e6471-159b-78eb-bd7b-bee179530341",
  pageTypeSlug: "temper-scribed-skill",
  slug: "scribed-banner-bearer-multi-target",
  title: "Shattering Banner",
  key: "scribed-banner-bearer-multi-target",
  baseName: "Banner Bearer",
  description: "Increases damage done with area of effect attacks by 6%.",
  icon: "/esoui/art/icons/ability_grimoire_support.dds",
  esoSkillId: 217699,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "alliance-war-support",
  skillType: "active",
  subcategoryId: "scribed",
  focusScriptId: "multi-target",
  grimoireId: "banner-bearer",
} as const satisfies TemperScribedSkill
