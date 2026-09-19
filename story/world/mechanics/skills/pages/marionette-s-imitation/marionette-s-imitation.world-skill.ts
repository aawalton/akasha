import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const marionetteSImitation = {
  id: "01a0657d-0243-7a9b-8ad3-24bdfc500788",
  type: "page-type/world-skill",
  slug: "marionette-s-imitation",
  title: "Marionette’s Imitation",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
