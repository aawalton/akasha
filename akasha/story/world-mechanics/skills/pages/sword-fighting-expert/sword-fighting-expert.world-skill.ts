import type { WorldSkill } from "../../world-skill.page-type.ts"

export const swordFightingExpert = {
  id: "01a0657d-0307-7d6a-a376-39c62d52ad9d",
  pageTypeSlug: "world-skill",
  slug: "sword-fighting-expert",
  title: "Sword Fighting – Expert",
  worldSlug: "the-wandering-inn",
  evolvesFromSlugs: ["sword-fighting-basic"],
  references: "jsonl",
} as const satisfies WorldSkill
