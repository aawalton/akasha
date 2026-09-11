import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const newsworthyEvent = {
  id: "01a0657d-027b-7b8e-8d64-9eff2786cb66",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "newsworthy-event",
  title: "Newsworthy Event",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
