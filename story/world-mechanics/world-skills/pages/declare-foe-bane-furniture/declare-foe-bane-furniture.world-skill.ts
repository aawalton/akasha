import type { WorldSkill } from "../../world-skill.page-type.ts"

export const declareFoeBaneFurniture = {
  id: "01a06575-9802-7ce8-92da-c31eeaa8159e",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "declare-foe-bane-furniture",
  title: "Declare Foe: Bane (Furniture)",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
