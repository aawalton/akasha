import type { WorldSkill } from "../../world-skill.page-type.ts"

export const enthrallingGlance = {
  id: "01a06575-9809-74f2-bf6b-c3dae20f2705",
  pageTypeSlug: "world-skill",
  slug: "enthralling-glance",
  title: "Enthralling Glance",
  worldSlug: "the-wandering-inn",
  evolvesFromSlugs: ["charming-smile"],
  references: "jsonl",
} as const satisfies WorldSkill
