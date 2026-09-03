import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const vengeanceBoneTotem = {
  id: "019e6f53-a8ca-79ca-9b73-04cf482046d0",
  pageTypeSlug: "temper-skill",
  slug: "vengeance-bone-totem",
  title: "Vengeance Bone Totem",
  key: "vengeance-bone-totem",
  baseName: "Vengeance Bone Totem",
  description:
    '"Summon an effigy of bone at your feet after |cffffff2|r seconds. Once completed, the totem fears up to 3 nearby enemies, causing them to cower in place for |cffffff4|r seconds and become afflicted with Major Maim for |cffffff10|r seconds, reducing their damage done by |cffffff10|r%."',
  icon: "/esoui/art/icons/ability_necromancer_010.dds",
  esoSkillId: 238178,
  isMorph: false,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "vengeance-necromancer-bone-tyrant",
  skillType: "active",
  subcategoryId: "vengeance-necromancer-bone-tyrant",
} as const satisfies TemperSkill
