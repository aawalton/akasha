import type { TemperScribedSkill } from "../temper-scribed-skill.page-type.ts"

export const scribedBannerBearerImmobilize = {
  id: "01a05fd2-7c3b-7a47-8b55-9be18dbf6efc",
  pageTypeSlug: "temper-scribed-skill",
  slug: "scribed-banner-bearer-immobilize",
  title: "Binding Banner",
  key: "scribed-banner-bearer-immobilize",
  baseName: "Banner Bearer",
  description:
    "You cleanse yourself of snares and immobilizations and are immune to them while the banner is active.",
  icon: "/esoui/art/icons/ability_grimoire_support.dds",
  esoSkillId: 230289,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "alliance-war-support",
  skillType: "active",
  subcategoryId: "scribed",
  focusScriptId: "immobilize",
  grimoireId: "banner-bearer",
} as const satisfies TemperScribedSkill
