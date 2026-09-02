import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const screamingCliffRacer86003 = {
  id: "01a05fd1-7cb3-7149-b3fc-cdfe55cb4dc1",
  pageTypeSlug: "temper-skill",
  slug: "screaming-cliff-racer-86003",
  title: "Screaming Cliff Racer",
  key: "screaming-cliff-racer-86003",
  baseName: "Dive",
  description:
    '"Command a cliff racer to dive bomb an enemy, dealing |cffffff7509|r Magic Damage.\\n\\nIf you are more than |cffffff7|r meters away from the target, you set them Off Balance for |cffffff7|r seconds.\\n\\nAfter dealing damage you increase your Weapon and Spell Damage by |cffffff100|r for |cffffff10|r seconds, which quadruples after damaging Off Balance enemies."',
  icon: "/esoui/art/icons/ability_warden_013_a.dds",
  esoSkillId: 86003,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 2,
  rank: 1,
  skillLineId: "warden-animal-companions",
  skillType: "active",
  subcategoryId: "warden-animal-companions",
} as const satisfies TemperSkill
