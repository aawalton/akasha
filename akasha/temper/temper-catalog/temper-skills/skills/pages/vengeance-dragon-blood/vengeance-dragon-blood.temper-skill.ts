import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const vengeanceDragonBlood = {
  id: "01a05fd1-d29a-75b1-9557-daf3af3539fb",
  pageTypeSlug: "temper-skill",
  slug: "vengeance-dragon-blood",
  title: "Vengeance Dragon Blood",
  key: "vengeance-dragon-blood",
  baseName: "Vengeance Dragon Blood",
  description:
    '"Draw on your draconic blood to heal for |cffffff5028|r Health, increasing by up to |cffffff50|r% additional healing based on your missing Health. This ability scales off your Max Health."',
  icon: "/esoui/art/icons/ability_dragonknight_011.dds",
  esoSkillId: 237638,
  isMorph: false,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "vengeance-dragonknight-draconic-power",
  skillType: "active",
  subcategoryId: "vengeance-dragonknight-draconic-power",
} as const satisfies TemperSkill
