import type { WorldItem } from "akasha/story/world/mechanics/items/world-item.page-type.types.ts"

export const skillLockProbeWorldLantern = {
  id: "01a17ff2-6f78-7b7a-b099-c70b19a8c238",
  type: "page-type/world-item",
  slug: "skill-lock-probe-world-lantern",
  title: "Lantern",
  world: "world/skill-lock-probe-world",
  description: "A tin lantern with a glass window and a wire handle.",
  category: "tool",
  createdAt: "2026-10-28T00:39:19.516Z",
  updatedAt: "2026-10-28T00:39:19.516Z",
} as const satisfies WorldItem
