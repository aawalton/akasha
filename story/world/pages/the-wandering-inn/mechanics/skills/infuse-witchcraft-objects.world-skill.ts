import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const infuseWitchcraftObjects = {
  id: "01a06575-981e-7311-9da5-4a8b6b77d735",
  type: "page-type/world-skill",
  slug: "infuse-witchcraft-objects",
  title: "Infuse Witchcraft: Objects",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
