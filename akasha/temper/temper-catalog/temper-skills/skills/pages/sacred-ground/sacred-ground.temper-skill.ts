import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const sacredGround = {
  id: "019e6245-a720-76c1-b776-2f3f12677730",
  pageTypeSlug: "temper-skill",
  slug: "sacred-ground",
  title: "Sacred Ground",
  key: "sacred-ground",
  baseName: "Sacred Ground",
  description:
    '"While standing in your own Cleansing Ritual, Rune Focus, or Rite of Passage area effects and for up to 4 seconds after leaving them you gain Minor Mending, increasing your healing done by 8%.\\n\\nAlso increases the amount of damage you can block by 10% for the duration."',
  icon: "/esoui/art/icons/ability_templar_014.dds",
  esoSkillId: 45207,
  isMorph: false,
  learnedLevel: 27,
  lineRankNeeded: 27,
  morphIndex: 0,
  rank: 2,
  skillLineId: "templar-restoring-light",
  skillType: "passive",
  subcategoryId: "templar-restoring-light",
  status: "unsupported",
} as const satisfies TemperSkill
