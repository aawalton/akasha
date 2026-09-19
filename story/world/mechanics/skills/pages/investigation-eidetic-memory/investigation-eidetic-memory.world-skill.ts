import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const investigationEideticMemory = {
  id: "01a06575-9820-761c-a366-9987b64abce8",
  type: "page-type/world-skill",
  slug: "investigation-eidetic-memory",
  title: "Investigation: Eidetic Memory",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
