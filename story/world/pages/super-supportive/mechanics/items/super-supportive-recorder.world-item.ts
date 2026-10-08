import type { WorldItem } from "akasha/story/world/mechanics/items/world-item.page-type.types.ts"

export const superSupportiveRecorder = {
  id: "01a0e9fc-be82-7ad5-ae0b-becaca3425e5",
  type: "page-type/world-item",
  slug: "super-supportive-recorder",
  title: "Recorder",
  world: "world/super-supportive",
  aliases: ["recorder cubes"],
  description:
    "An Artonan stone shape that gives a multisensory experience of its recorded content when activated.",
  createdAt: "2026-09-28T21:47:30.306Z",
  updatedAt: "2026-09-28T21:47:33.000Z",
} as const satisfies WorldItem
