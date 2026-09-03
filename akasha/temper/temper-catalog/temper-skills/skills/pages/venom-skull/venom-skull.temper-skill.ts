import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const venomSkull = {
  id: "019e6245-a761-73c9-87da-42524cdef78a",
  pageTypeSlug: "temper-skill",
  slug: "venom-skull",
  title: "Venom Skull",
  key: "venom-skull",
  baseName: "Flame Skull",
  description:
    '"Lob an explosive skull at an enemy, dealing 2160 Poison Damage.\\n\\nEvery third cast of this ability deals 50% increased damage and creates a corpse near the enemy, up to once every 3 seconds.\\n\\nWhile slotted, casting any Necromancer ability while you are in combat will count towards the third cast."',
  icon: "/esoui/art/icons/ability_necromancer_001_a.dds",
  esoSkillId: 40117624,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 1,
  rank: 8,
  skillLineId: "necromancer-grave-lord",
  skillType: "active",
  subcategoryId: "necromancer-grave-lord",
} as const satisfies TemperSkill
