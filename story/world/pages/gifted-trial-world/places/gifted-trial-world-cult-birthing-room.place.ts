import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const giftedTrialWorldCultBirthingRoom = {
  id: "01a18d10-93f1-7bcc-a561-42d30d29cfe6",
  type: "page-type/place",
  slug: "gifted-trial-world-cult-birthing-room",
  title: "Cult Birthing Room",
  world: "world/gifted-trial-world",
  within: "place/gifted-trial-world-cult-hideout",
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
  createdAt: "2026-10-30T13:47:19.494Z",
  updatedAt: "2026-10-30T13:47:19.494Z",
} as const satisfies Place
