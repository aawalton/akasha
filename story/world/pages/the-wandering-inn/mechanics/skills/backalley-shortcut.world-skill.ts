import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const backalleyShortcut = {
  id: "01a06575-97f2-7e72-b94d-3914e6774b49",
  type: "page-type/world-skill",
  slug: "backalley-shortcut",
  title: "Backalley Shortcut",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
