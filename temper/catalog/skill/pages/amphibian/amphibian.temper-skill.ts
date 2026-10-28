import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const amphibian = {
  id: "019e624a-12bc-7a6e-8568-3957e36c03d4",
  type: "page-type/temper-skill",
  slug: "amphibian",
  title: "Amphibian",
  key: "amphibian",
  baseName: "Amphibian",
  description:
    "Increases your experience gain with the Restoration Staff skill line by 15%.\n\nIncreases your swimming speed by 50%.",
  icon: "/esoui/art/icons/ability_templar_010.dds",
  esoAbilityId: 36582,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "temper-skill-line/racial-argonian-skills",
  skillType: "temper-skill-type/passive",
  status: "unsupported",
  effects: "jsonl",
  hashPlace: 30,
  createdAt: "2026-05-26T03:18:02.172Z",
  updatedAt: "2026-10-28T21:33:14.554Z",
  equations: ["<<1>> = 50% (Constant)"],
} as const satisfies TemperSkill
