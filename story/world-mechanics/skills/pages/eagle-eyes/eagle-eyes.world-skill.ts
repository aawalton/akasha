import type { WorldSkill } from "../../world-skill.page-type.ts"

export const eagleEyes = {
  id: "01a06575-9806-7219-85db-4ab03c9614c4",
  pageTypeSlug: "world-skill",
  slug: "eagle-eyes",
  title: "Eagle Eyes",
  worldSlug: "the-wandering-inn",
  evolvesFromSlugs: ["keen-eyes"],
  references: "jsonl",
} as const satisfies WorldSkill
