import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereIvIceheartForest = {
  id: "01a0ea11-18d2-75a8-b28a-fa5a638ead8e",
  type: "page-type/place",
  slug: "otherwhere-iv-iceheart-forest",
  title: "Iceheart Forest",
  world: "world/beware-of-chicken",
  within: "place/otherwhere-iv-sea-of-snow",
  facts: [
    {
      fact: "Iceheart Forest is the Thunderhooves' ancestral homeland, far north in the Sea of Snow.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Iceheart Forest is ruled by Forest Sweeper, and is at least a thousand li across.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Iceheart Forest holds the Eternal Winterbloom, a colossal ice tree shaped like a cherry tree.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Frozen Font, a stream of liquid Ice Qi by the Winterbloom, kills instantly on touch.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Sleeping Hollow is a Thunderhoof tomb from the ancient Demon War, marked by giant skull cairns.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Iceheart Forest's wards feel warm to lost mortals, guiding them to shelter and then onward.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Iceheart Forest hides a massive well of Demonic Qi guarded by a Spirit Beast.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Place
