import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const magmaShell17874 = {
  id: "01a05fd1-2df4-7512-a673-9011a8136f1f",
  pageTypeSlug: "temper-skill",
  slug: "magma-shell-17874",
  title: "Magma Shell",
  key: "magma-shell-17874",
  baseName: "Magma Armor",
  description:
    '"Ignite the molten lava in your veins, limiting incoming damage to |cffffff3|r% of your Max Health for |cffffff15|r seconds.\\n\\nWhen activated, nearby allies gain a damage shield for |cffffff153|r% of their Max Health for |cffffff10|r seconds.\\n\\nWhile active, you cannot generate Ultimate."',
  icon: "/esoui/art/icons/ability_dragonknight_018_a.dds",
  esoSkillId: 17874,
  isMorph: true,
  learnedLevel: 12,
  lineRankNeeded: 12,
  morphIndex: 1,
  rank: 12,
  skillLineId: "dragonknight-earthen-heart",
  skillType: "ultimate",
  subcategoryId: "dragonknight-earthen-heart",
} as const satisfies TemperSkill
