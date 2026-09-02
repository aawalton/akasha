import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const crystalFragments = {
  id: "01a05fd0-8df0-7a34-a585-d8c57c048433",
  pageTypeSlug: "temper-skill",
  slug: "crystal-fragments",
  title: "Crystal Fragments",
  key: "crystal-fragments",
  baseName: "Crystal Shard",
  description:
    '"Conjure dark crystals to bombard an enemy, dealing 2483 Magic Damage. Your next non-Ultimate ability cast within 3 seconds costs 10% less.\\n\\nWhile slotted on either bar, casting a non-Ultimate ability has a 33% chance of causing your next Crystal Fragments to be instant cast at half cost, dealing 4123 Magic Damage."',
  icon: "/esoui/art/icons/ability_sorcerer_thunderstomp.dds",
  esoSkillId: 47569,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 2,
  rank: 12,
  skillLineId: "sorcerer-dark-magic",
  skillType: "active",
  subcategoryId: "sorcerer-dark-magic",
} as const satisfies TemperSkill
