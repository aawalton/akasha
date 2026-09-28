import type { WorldItem } from "akasha/story/world/mechanics/items/world-item.page-type.types.ts"

export const superSupportiveDetectorFlashlight = {
  id: "01a0e9f8-6bb2-7272-b8e0-fcc018733e0d",
  type: "page-type/world-item",
  slug: "super-supportive-detector-flashlight",
  title: "detector flashlight",
  world: "world/super-supportive",
  description:
    "A flashlight whose red beam shows flaws in handcrafted or spell-crafted objects as hot pink.",
} as const satisfies WorldItem
