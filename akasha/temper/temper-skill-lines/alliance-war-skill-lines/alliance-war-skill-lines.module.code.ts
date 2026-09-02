import type { SkillLineTemplate } from "../skill-line-template/skill-line-template.module.code.ts"

export const ALLIANCE_WAR_SKILL_LINES = {
  "alliance-war-assault": {
    id: "alliance-war-assault" as const,
    name: "Assault",
    subcategoryId: "alliance-war" as const,
    displayOrder: 43,
    esoSkillLineId: 48,
    maxRank: 10,
  },
  "alliance-war-emperor": {
    id: "alliance-war-emperor" as const,
    name: "Emperor",
    subcategoryId: "alliance-war" as const,
    displayOrder: 44,
    esoSkillLineId: 71,
    maxRank: 9,
  },
  "alliance-war-support": {
    id: "alliance-war-support" as const,
    name: "Support",
    subcategoryId: "alliance-war" as const,
    displayOrder: 45,
    esoSkillLineId: 67,
    maxRank: 10,
  },
} satisfies Record<string, SkillLineTemplate>
