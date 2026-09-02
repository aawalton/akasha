import type { TemperSkill } from "../temper-skill.page-type.ts"

export const vengeanceObsidianShield = {
  id: "01a05fd2-1e7a-7436-ab9d-58b1741819bd",
  pageTypeSlug: "temper-skill",
  slug: "vengeance-obsidian-shield",
  title: "Vengeance Obsidian Shield",
  key: "vengeance-obsidian-shield",
  baseName: "Vengeance Obsidian Shield",
  description:
    '"Call the earth to your defense, granting a damage shield to up to 3 of you and your allies that absorbs |cffffff13584|r damage."',
  icon: "/esoui/art/icons/ability_dragonknight_017.dds",
  esoSkillId: 237785,
  isMorph: false,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "vengeance-dragonknight-earthen-heart",
  skillType: "active",
  subcategoryId: "vengeance-dragonknight-earthen-heart",
} as const satisfies TemperSkill
