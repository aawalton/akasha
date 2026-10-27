import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const giftedCultBirthingRoom = {
  id: "01a17f55-efd1-767a-85ff-48973163874c",
  type: "page-type/place",
  slug: "gifted-cult-birthing-room",
  title: "Cult Birthing Room",
  world: "world/gifted",
  within: "place/gifted-cult-hideout",
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
  createdAt: "2026-10-27T21:48:20.815Z",
  updatedAt: "2026-10-27T21:48:20.815Z",
} as const satisfies Place
