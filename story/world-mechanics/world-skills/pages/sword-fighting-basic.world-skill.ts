import type { WorldSkill } from "../world-skill.page-type.ts"

export const swordFightingBasic = {
  id: "01a0657d-0307-7af0-8d3a-8655bb93ffb9",
  pageTypeSlug: "world-skill",
  slug: "sword-fighting-basic",
  title: "Sword Fighting – Basic",
  worldSlug: "the-wandering-inn",
  evolvesToSlugs: ["sword-fighting-expert"],
} as const satisfies WorldSkill
