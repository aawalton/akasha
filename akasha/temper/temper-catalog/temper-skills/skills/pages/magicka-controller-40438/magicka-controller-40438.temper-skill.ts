import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const magickaController40438 = {
  id: "019e6f53-a43a-7b86-9ffb-0dfb5b213e65",
  pageTypeSlug: "temper-skill",
  slug: "magicka-controller-40438",
  title: "Magicka Controller",
  key: "magicka-controller-40438",
  baseName: "Magicka Controller",
  description:
    '"Increases your Max Magicka and Magicka Recovery by |cffffff1|r% for each Mages Guild ability slotted.\\n\\nCurrent bonus: |cffffff0|r%."',
  icon: "/esoui/art/icons/ability_sorcerer_044.dds",
  esoSkillId: 40438,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 7,
  morphIndex: 0,
  rank: 7,
  skillLineId: "guild-mages-guild",
  skillType: "passive",
  subcategoryId: "guild-mages-guild",
} as const satisfies TemperSkill
