import type { WorldSkill } from "../../world-skill.page-type.ts"

export const basicAlchemy = {
  id: "01a06575-97f3-7e8b-b3f3-bfa51993a7de",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "basic-alchemy",
  title: "Basic Alchemy",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
