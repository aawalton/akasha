import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const maturation85880 = {
  id: "019e6f53-a466-7f0e-aea0-25c290ac524c",
  pageTypeSlug: "temper-skill",
  slug: "maturation-85880",
  title: "Maturation",
  key: "maturation-85880",
  baseName: "Maturation",
  description:
    '"When you activate a heal on yourself or an ally you grant the target Minor Toughness, increasing their Max Health by |cffffff10|r% for |cffffff10|r seconds."',
  icon: "/esoui/art/icons/passive_warden_007.dds",
  esoSkillId: 85880,
  isMorph: false,
  learnedLevel: 39,
  lineRankNeeded: 39,
  morphIndex: 0,
  rank: 39,
  skillLineId: "warden-green-balance",
  skillType: "passive",
  subcategoryId: "warden-green-balance",
} as const satisfies TemperSkill
