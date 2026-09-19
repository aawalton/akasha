import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const breadPestkiller = {
  id: "01a06575-97f8-7535-bdee-50974ad67825",
  type: "page-type/world-skill",
  slug: "bread-pestkiller",
  title: "Bread: Pestkiller",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
