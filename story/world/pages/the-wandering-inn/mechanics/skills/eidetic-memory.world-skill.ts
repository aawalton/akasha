import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const eideticMemory = {
  id: "01a06575-9807-7c60-9941-0ce598dc3157",
  type: "page-type/world-skill",
  slug: "eidetic-memory",
  title: "Eidetic Memory",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
