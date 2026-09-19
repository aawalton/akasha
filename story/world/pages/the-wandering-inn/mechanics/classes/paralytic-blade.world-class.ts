import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const paralyticBlade = {
  id: "01a0657e-0236-7979-bd81-ac289bbffa7d",
  type: "page-type/world-class",
  slug: "paralytic-blade",
  title: "Paralytic Blade",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
