import type { WorldItem } from "akasha/story/world/mechanics/items/world-item.page-type.types.ts"

export const superSupportiveSystemAccessSigil = {
  id: "01a0e9f4-be68-7f91-80bc-323b77f7226e",
  type: "page-type/world-item",
  slug: "super-supportive-system-access-sigil",
  title: "System access sigil",
  world: "world/super-supportive",
  description: "A sigil that opens System-locked places or access.",
} as const satisfies WorldItem
