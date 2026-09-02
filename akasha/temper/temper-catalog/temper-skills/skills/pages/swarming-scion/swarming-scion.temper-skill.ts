import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const swarmingScion = {
  id: "01a05fd1-d259-7094-86d0-fd20a84cce13",
  pageTypeSlug: "temper-skill",
  slug: "swarming-scion",
  title: "Swarming Scion",
  key: "swarming-scion",
  baseName: "Blood Scion",
  description:
    '"Transform into a monstrous creature of the night, instantly healing to full Health.\\n\\nWhile transformed, your Max Health, Magicka, and Stamina are increased by 10000, you heal for 15% of all damage you deal, and you can see enemies through walls. \\n\\nBats also swarm around you and shred enemies that come close, dealing 870 Magic Damage every 1 second."',
  icon: "/esoui/art/icons/ability_u26_vampire_06_a.dds",
  esoSkillId: 41926,
  isMorph: true,
  learnedLevel: 5,
  lineRankNeeded: 5,
  morphIndex: 1,
  rank: 8,
  skillLineId: "world-vampire",
  skillType: "ultimate",
  subcategoryId: "world-vampire",
} as const satisfies TemperSkill
