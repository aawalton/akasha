import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const obsidianShield = {
  id: "019e6f53-a4cb-704c-b4a0-130109f23eca",
  pageTypeSlug: "temper-skill",
  slug: "obsidian-shield",
  title: "Obsidian Shield",
  key: "obsidian-shield",
  baseName: "Obsidian Shield",
  description:
    '"Call the earth to your defense, granting a damage shield for you and nearby allies that absorbs |cffffff1873|r damage. This portion of the ability scales off your Max Health.\\n\\nYou also gain Major Mending, increasing your healing done by |cffffff16|r% for |cffffff4|r seconds."',
  icon: "/esoui/art/icons/ability_dragonknight_017.dds",
  esoSkillId: 29071,
  isMorph: false,
  learnedLevel: 20,
  lineRankNeeded: 20,
  morphIndex: 0,
  rank: 20,
  skillLineId: "dragonknight-earthen-heart",
  skillType: "active",
  subcategoryId: "dragonknight-earthen-heart",
} as const satisfies TemperSkill
