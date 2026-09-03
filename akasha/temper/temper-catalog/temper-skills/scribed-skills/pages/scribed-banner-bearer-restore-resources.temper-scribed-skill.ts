import type { TemperScribedSkill } from "../temper-scribed-skill.page-type.ts"

export const scribedBannerBearerRestoreResources = {
  id: "019e6471-159f-7589-8387-0ebe410bb8a3",
  pageTypeSlug: "temper-scribed-skill",
  slug: "scribed-banner-bearer-restore-resources",
  title: "Restorative Banner",
  key: "scribed-banner-bearer-restore-resources",
  baseName: "Banner Bearer",
  description: "Reduces the cost of non-Ultimate abilities by 8%.",
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
  focusScriptId: "restore-resources",
  grimoireId: "banner-bearer",
} as const satisfies TemperScribedSkill
