import type { TemperScribedSkill } from "../temper-scribed-skill.page-type.ts"

export const scribedBannerBearerShockDamage = {
  id: "01a05fd2-7c3d-75b2-8573-63461ca4db82",
  pageTypeSlug: "temper-scribed-skill",
  slug: "scribed-banner-bearer-shock-damage",
  title: "Shocking Banner",
  key: "scribed-banner-bearer-shock-damage",
  baseName: "Banner Bearer",
  description: "Increases damage done with direct damage by 6%.",
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
  focusScriptId: "shock-damage",
  grimoireId: "banner-bearer",
} as const satisfies TemperScribedSkill
