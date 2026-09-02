import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const bloodScion = {
  id: "01a05fd0-4371-7130-a9b1-31f42b970461",
  pageTypeSlug: "temper-skill",
  slug: "blood-scion",
  title: "Blood Scion",
  key: "blood-scion",
  baseName: "Blood Scion",
  description:
    '"Transform into a monstrous creature of the night, instantly healing to full Health.\\n\\nWhile transformed, your Max Health, Magicka, and Stamina are increased by |cffffff10000|r, you heal for |cffffff15|r% of all damage you deal, and you can see enemies through walls."',
  icon: "/esoui/art/icons/ability_u26_vampire_06.dds",
  esoSkillId: 32624,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 5,
  morphIndex: 0,
  rank: 5,
  skillLineId: "world-vampire",
  skillType: "ultimate",
  subcategoryId: "world-vampire",
} as const satisfies TemperSkill
