import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const giftedPolishWorldCultBirthingRoom = {
  id: "01a18e17-127d-7929-91c7-a7c0aa7660c9",
  type: "page-type/place",
  slug: "gifted-polish-world-cult-birthing-room",
  title: "Cult Birthing Room",
  world: "world/gifted-polish-world",
  within: "place/gifted-polish-world-cult-hideout",
  depth: 0,
  facts: [
    {
      fact: "The birthing room is a small, dim stone room deep in the cult's hideout.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A stone bowl lined with ratty blankets serves as the baby's cradle.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A wooden door opens on a hall where the cult chants, plays music and feasts.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The cult's leaders gather beside the bowl each day to talk.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  createdAt: "2026-10-30T18:34:02.178Z",
  updatedAt: "2026-10-30T18:34:02.178Z",
} as const satisfies Place
