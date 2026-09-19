import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const manaSiphonObject = {
  id: "01a0657d-0242-788e-b246-57472984508a",
  type: "page-type/world-skill",
  slug: "mana-siphon-object",
  title: "Mana Siphon (Object)",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
