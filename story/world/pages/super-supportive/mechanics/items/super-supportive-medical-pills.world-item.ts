import type { WorldItem } from "akasha/story/world/mechanics/items/world-item.page-type.types.ts"

export const superSupportiveMedicalPills = {
  id: "01a0e9f4-be68-7217-aabc-871c221b45a2",
  type: "page-type/world-item",
  slug: "super-supportive-medical-pills",
  title: "Silver pill bottle",
  world: "world/super-supportive",
  aliases: ["four pills"],
  description:
    "A silver bottle of four pills: no vomiting, no fainting, Thetet Fever inoculation, no pain.",
  createdAt: "2026-09-28T21:38:45.992Z",
  updatedAt: "2026-09-28T21:38:49.000Z",
} as const satisfies WorldItem
