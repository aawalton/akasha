import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const antiMagicSlash = {
  id: "01a06575-97eb-7fb0-9f66-8a6437932cfa",
  type: "page-type/world-skill",
  slug: "anti-magic-slash",
  title: "Anti-magic Slash",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
