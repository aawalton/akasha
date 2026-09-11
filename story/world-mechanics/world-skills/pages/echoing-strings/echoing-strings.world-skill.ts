import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const echoingStrings = {
  id: "01a06575-9806-775c-bdd3-e5245effbeb0",
  type: "world-skill",
  slug: "echoing-strings",
  title: "Echoing Strings",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
