import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const animateBlastbones = {
  id: "019e6245-a5eb-7fee-9046-3032c81e1890",
  type: "page-type/temper-skill",
  slug: "animate-blastbones",
  title: "Animate Blastbones",
  key: "animate-blastbones",
  baseName: "Reanimate",
  description:
    "Bring your allies back from the brink of death, resurrecting up to 3 allies at the target location.\n\nYou consume up to 3 other corpses in the area and summon a Blighted Blastbones for each corpse consumed.",
  icon: "/esoui/art/icons/ability_necromancer_018_b.dds",
  esoAbilityId: 40118379,
  isMorph: true,
  learnedLevel: 12,
  lineRankNeeded: 12,
  morphIndex: 2,
  rank: 12,
  skillLineId: "temper-skill-line/necromancer-living-death",
  skillType: "temper-skill-type/ultimate",
  hashPlace: 35,
  createdAt: "2026-05-26T03:13:12.171Z",
  updatedAt: "2026-10-28T21:33:14.554Z",
} as const satisfies TemperSkill
