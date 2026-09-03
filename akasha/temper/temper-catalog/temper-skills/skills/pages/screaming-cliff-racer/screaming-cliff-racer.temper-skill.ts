import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const screamingCliffRacer = {
  id: "019e6245-a726-70ab-acb3-e8f2ba83dd18",
  pageTypeSlug: "temper-skill",
  slug: "screaming-cliff-racer",
  title: "Screaming Cliff Racer",
  key: "screaming-cliff-racer",
  baseName: "Dive",
  description:
    '"Command a cliff racer to dive bomb an enemy, dealing 2160 Magic Damage.\\n\\nIf you are more than 7 meters away from the target, you set them Off Balance for 7 seconds.\\n\\nAfter dealing damage you increase your Weapon and Spell Damage by 100 for 10 seconds, which quadruples after damaging Off Balance enemies."',
  icon: "/esoui/art/icons/ability_warden_013_a.dds",
  esoSkillId: 86006,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 2,
  rank: 12,
  skillLineId: "warden-animal-companions",
  skillType: "active",
  subcategoryId: "warden-animal-companions",
} as const satisfies TemperSkill
