import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const blueBoxesStatus = {
  id: "01a14af3-b1f6-7a3c-9169-c894bc7c4931",
  type: "page-type/world-mechanic",
  slug: "blue-boxes-status",
  title: "Status",
  world: "world/blue-boxes",
  description:
    "A glassy blue window only its reader sees, showing her name, level, class and where she is.",
  createdAt: "2026-10-17T17:40:47.221Z",
  updatedAt: "2026-10-17T17:40:47.221Z",
} as const satisfies WorldMechanic
