import type { WorldSkill } from "../../world-skill.page-type.ts"

export const swordFightingExpert = {
  id: "01a0657d-0307-7d6a-a376-39c62d52ad9d",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "sword-fighting-expert",
  title: "Sword Fighting – Expert",
  world: "the-wandering-inn",
  evolvesFromSlugs: ["sword-fighting-basic"],
  references: "jsonl",
} as const satisfies WorldSkill
