import type { WorldItem } from "akasha/story/world/mechanics/items/world-item.page-type.types.ts"

export const skillLockProbeWorldLantern = {
  id: "01a17ff8-9a7f-738a-a81c-ab8b8b6c52fb",
  type: "page-type/world-item",
  slug: "skill-lock-probe-world-lantern",
  title: "Lantern",
  world: "world/skill-lock-probe-world",
  description: "A tin lantern with a glass window and a wire handle.",
  category: "tool",
  createdAt: "2026-10-28T00:46:04.001Z",
  updatedAt: "2026-10-28T00:46:04.001Z",
} as const satisfies WorldItem
