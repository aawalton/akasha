import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const indirectHex = {
  id: "01a06575-981e-70be-855f-e134e9361fca",
  type: "page-type/world-skill",
  slug: "indirect-hex",
  title: "Indirect Hex",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
