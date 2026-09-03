import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const vengeanceLacerate = {
  id: "019e6f53-a92c-73f6-b8b5-ed508cce506b",
  pageTypeSlug: "temper-skill",
  slug: "vengeance-lacerate",
  title: "Vengeance Lacerate",
  key: "vengeance-lacerate",
  baseName: "Vengeance Lacerate",
  description:
    '"Slash up to 3 enemies in front of you, causing them to bleed for |cffffff43785|r Bleed Damage over |cffffff8|r seconds. You heal |cffffff3213|r Health every time damage is dealt."',
  icon: "/esoui/art/icons/ability_dualwield_006.dds",
  esoSkillId: 241236,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "vengeance-weapon-dual-wield",
  skillType: "ultimate",
  subcategoryId: "vengeance-weapon-dual-wield",
} as const satisfies TemperSkill
