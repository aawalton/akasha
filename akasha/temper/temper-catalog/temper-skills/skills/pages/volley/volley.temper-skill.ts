import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const volley = {
  id: "01a05fd2-1e94-7a95-afea-68f940d85926",
  pageTypeSlug: "temper-skill",
  slug: "volley",
  title: "Volley",
  key: "volley",
  baseName: "Volley",
  description:
    '"Launch a multitude of arrows into the sky to rain down, dealing |cffffff1196|r Physical Damage to enemies in the target area every |cffffff1|r second for |cffffff8|r seconds, after a |cffffff2|r second delay."',
  icon: "/esoui/art/icons/ability_bow_003.dds",
  esoSkillId: 28876,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 4,
  morphIndex: 0,
  rank: 4,
  skillLineId: "weapon-bow",
  skillType: "active",
  subcategoryId: "weapon-bow",
} as const satisfies TemperSkill
