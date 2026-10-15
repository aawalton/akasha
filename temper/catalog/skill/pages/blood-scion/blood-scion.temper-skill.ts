import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const bloodScion = {
  id: "019e6f53-9f5c-7001-80d1-ba8cc13d3a10",
  type: "page-type/temper-skill",
  slug: "blood-scion",
  title: "Blood Scion",
  key: "blood-scion",
  baseName: "Blood Scion",
  description:
    "Transform into a monstrous creature of the night, instantly healing to full Health.\n\nWhile transformed, your Max Health, Magicka, and Stamina are increased by |cffffff10000|r, you heal for |cffffff15|r% of all damage you deal, and you can see enemies through walls.",
  icon: "/esoui/art/icons/ability_u26_vampire_06.dds",
  esoSkillId: 32624,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 5,
  morphIndex: 0,
  rank: 5,
  skillLineId: "temper-skill-line/world-vampire",
  skillType: "temper-skill-type/ultimate",
  hashPlace: 129,
  createdAt: "2026-05-28T16:03:31.804Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: ["<<1>> = 10000 (Constant)", "<<2>> = 15% (Constant)"],
} as const satisfies TemperSkill
