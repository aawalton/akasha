import type { WorldSkill } from "akasha/story/world-mechanic/world-skill/world-skill.page-type.types.ts"

export const infuseColor = {
  id: "01a06575-981e-717c-bfe5-44b9d95135b7",
  type: "world-skill",
  slug: "infuse-color",
  title: "Infuse Color",
  world: "world/the-wandering-inn",
  aliases: ["infuse-colors"],
  references: "jsonl",
} as const satisfies WorldSkill
