import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const doorRemoteLocking = {
  id: "01a06575-9805-7493-b00a-87190cd05625",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "door-remote-locking",
  title: "Door: Remote Locking",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
