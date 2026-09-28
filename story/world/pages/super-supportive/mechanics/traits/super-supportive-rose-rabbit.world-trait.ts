import type { WorldTrait } from "akasha/story/world/mechanics/traits/world-trait.page-type.types.ts"

export const superSupportiveRoseRabbit = {
  id: "01a0e9f0-79f5-754f-8784-915473deaf9b",
  type: "page-type/world-trait",
  slug: "super-supportive-rose-rabbit",
  title: "Rose Rabbit",
  world: "world/super-supportive",
  story: "story-read/super-supportive",
  description: "A Rabbit trait for attention to detail.",
} as const satisfies WorldTrait
