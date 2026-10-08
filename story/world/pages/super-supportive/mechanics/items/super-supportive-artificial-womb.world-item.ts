import type { WorldItem } from "akasha/story/world/mechanics/items/world-item.page-type.types.ts"

export const superSupportiveArtificialWomb = {
  id: "01a0e9fc-be81-7630-b63b-e1a950dcf275",
  type: "page-type/world-item",
  slug: "super-supportive-artificial-womb",
  title: "Artificial womb",
  world: "world/super-supportive",
  aliases: ["cradle"],
  description: "A womb that carries a fetus outside the body, held and monitored in a cradle pod.",
  createdAt: "2026-09-28T21:47:30.305Z",
  updatedAt: "2026-09-28T21:47:33.000Z",
} as const satisfies WorldItem
