import type { WorldItem } from "akasha/story/world/mechanics/items/world-item.page-type.types.ts"

export const superSupportiveEscapeFlyer = {
  id: "01a0e9f8-6bb3-7f26-9806-b214135019ee",
  type: "page-type/world-item",
  slug: "super-supportive-escape-flyer",
  title: "escape flyer",
  world: "world/super-supportive",
  aliases: ["flyer"],
  description: "A one-seat silver egg with a clear top that flies a preset course to safety.",
} as const satisfies WorldItem
