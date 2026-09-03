import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const vengeanceCleave = {
  id: "019e6f53-a8d6-71fc-a283-ba963c468fe8",
  pageTypeSlug: "temper-skill",
  slug: "vengeance-cleave",
  title: "Vengeance Cleave",
  key: "vengeance-cleave",
  baseName: "Vengeance Cleave",
  description:
    '"Focus your strength into a mighty swing, dealing |cffffff8820|r Physical Damage to up to 3 enemies in front of you.\\n\\nYou also gain a damage shield that absorbs |cffffff9056|r damage for |cffffff6|r seconds."',
  icon: "/esoui/art/icons/ability_2handed_002.dds",
  esoSkillId: 240480,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "vengeance-weapon-two-handed",
  skillType: "active",
  subcategoryId: "vengeance-weapon-two-handed",
} as const satisfies TemperSkill
