import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const superSupportiveChaosIndex = {
  id: "01a0e9f7-dffa-740e-8f5f-0b462071c507",
  type: "page-type/world-mechanic",
  slug: "super-supportive-chaos-index",
  title: "Chaos index",
  world: "world/super-supportive",
  aliases: ["chaos map"],
  description:
    "A measure of chaos in an area, shown on maps like a weather radar in pink, purple and red.",
  createdAt: "2026-09-28T21:42:11.194Z",
  updatedAt: "2026-09-28T21:42:14.000Z",
} as const satisfies WorldMechanic
