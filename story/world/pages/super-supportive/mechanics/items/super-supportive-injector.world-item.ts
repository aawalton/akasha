import type { WorldItem } from "akasha/story/world/mechanics/items/world-item.page-type.types.ts"

export const superSupportiveInjector = {
  id: "01a0e9f8-6bb3-7165-bc13-66bd24a731d2",
  type: "page-type/world-item",
  slug: "super-supportive-injector",
  title: "injector",
  world: "world/super-supportive",
  aliases: ["anti-emetic injector", "pain injector", "stimulant injector"],
  description: "A thimble-sized cylinder of medicine that injects itself into the body.",
} as const satisfies WorldItem
