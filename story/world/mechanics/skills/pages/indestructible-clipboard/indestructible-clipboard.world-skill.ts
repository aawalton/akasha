import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const indestructibleClipboard = {
  id: "01a06575-981e-78f3-996c-cd3e341587d0",
  type: "page-type/world-skill",
  slug: "indestructible-clipboard",
  title: "Indestructible Clipboard",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
