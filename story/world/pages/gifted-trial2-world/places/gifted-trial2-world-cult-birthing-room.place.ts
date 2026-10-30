import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const giftedTrial2WorldCultBirthingRoom = {
  id: "01a18dab-06cd-79b8-ada1-41828e1f4301",
  type: "page-type/place",
  slug: "gifted-trial2-world-cult-birthing-room",
  title: "Cult Birthing Room",
  world: "world/gifted-trial2-world",
  within: "place/gifted-trial2-world-cult-hideout",
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
  createdAt: "2026-10-30T16:36:03.198Z",
  updatedAt: "2026-10-30T16:36:03.198Z",
} as const satisfies Place
