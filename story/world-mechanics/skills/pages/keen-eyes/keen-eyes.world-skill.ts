import type { WorldSkill } from "../../world-skill.page-type.ts"

export const keenEyes = {
  id: "01a06575-9821-730f-bd94-a6212ff72697",
  pageTypeSlug: "world-skill",
  slug: "keen-eyes",
  title: "Keen Eyes",
  worldSlug: "the-wandering-inn",
  evolvesToSlugs: ["eagle-eyes"],
  references: "jsonl",
} as const satisfies WorldSkill
