import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const keenEyes = {
  id: "01a06575-9821-730f-bd94-a6212ff72697",
  type: "page-type/world-skill",
  slug: "keen-eyes",
  title: "Keen Eyes",
  world: "world/the-wandering-inn",
  evolvesToSlugs: ["eagle-eyes"],
  references: "jsonl",
} as const satisfies WorldSkill
