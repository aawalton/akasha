import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const blightedBlastbones = {
  id: "019e6245-a5fc-775f-bab6-4540622c9f41",
  pageTypeSlug: "temper-skill",
  slug: "blighted-blastbones",
  title: "Blighted Blastbones",
  key: "blighted-blastbones",
  baseName: "Sacrificial Bones",
  description:
    '"Summon a decaying skeleton from the ground after 2.5 seconds. The skeleton runs after the target and explodes when it gets close to them, dealing 3600 Disease Damage to all enemies nearby and applying the Diseased status effect and Major Defile to them for 4 seconds, reducing their healing received and damage shield strength by 12%.\\n\\nCreates a corpse on death."',
  icon: "/esoui/art/icons/ability_necromancer_002_a.dds",
  esoSkillId: 40117690,
  isMorph: true,
  learnedLevel: 4,
  lineRankNeeded: 4,
  morphIndex: 1,
  rank: 8,
  skillLineId: "necromancer-grave-lord",
  skillType: "active",
  subcategoryId: "necromancer-grave-lord",
} as const satisfies TemperSkill
