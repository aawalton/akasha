import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const everlastingSweep = {
  id: "019e6245-a675-7da9-ab6e-949740ab53d8",
  pageTypeSlug: "temper-skill",
  slug: "everlasting-sweep",
  title: "Everlasting Sweep",
  key: "everlasting-sweep",
  baseName: "Radial Sweep",
  description:
    '"Swing your Aedric spear around with holy vengeance, dealing 2399 Physical Damage to all nearby enemies and an additional 1161 Physical Damage every 2 seconds for 10 seconds. The duration is extended by 2 seconds for each enemy hit."',
  icon: "/esoui/art/icons/ability_templar_empowering_sweep.dds",
  esoSkillId: 23794,
  isMorph: true,
  learnedLevel: 12,
  lineRankNeeded: 12,
  morphIndex: 1,
  rank: 8,
  skillLineId: "templar-aedric-spear",
  skillType: "ultimate",
  subcategoryId: "templar-aedric-spear",
} as const satisfies TemperSkill
