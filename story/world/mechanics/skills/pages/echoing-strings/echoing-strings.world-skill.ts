import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const echoingStrings = {
  id: "01a06575-9806-775c-bdd3-e5245effbeb0",
  type: "page-type/world-skill",
  slug: "echoing-strings",
  title: "Echoing Strings",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
