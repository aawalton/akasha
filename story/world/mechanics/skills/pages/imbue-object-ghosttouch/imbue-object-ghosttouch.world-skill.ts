import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const imbueObjectGhosttouch = {
  id: "01a06575-981c-766c-a0a6-fdfacb3f7042",
  type: "page-type/world-skill",
  slug: "imbue-object-ghosttouch",
  title: "Imbue Object: Ghosttouch",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
