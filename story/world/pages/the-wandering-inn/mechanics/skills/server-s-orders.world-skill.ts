import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const serverSOrders = {
  id: "01a0657d-02bf-7305-bf0b-caa5bb651205",
  type: "page-type/world-skill",
  slug: "server-s-orders",
  title: "Server’s Orders",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
