import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereVAncestorShrine = {
  id: "01a0e9ff-99c6-72f1-9004-c9a5c25727c7",
  type: "page-type/place",
  slug: "otherwhere-v-ancestor-shrine",
  title: "The Ancestor Shrine",
  world: "world/ends-of-magic",
  within: "place/otherwhere-v-serrinford",
  exits: [
    {
      to: "place/otherwhere-v-serrinford",
      way: "Down the knoll's worn steps into the village lanes.",
      direction: "down",
    },
  ],
  facts: [
    {
      fact: "The Ancestor Shrine is a small round hut on a knoll at Serrinford's east side, in the palisade.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A great lintel stone over the shrine's entrance is worn smooth by generations of touching hands.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Inside, carved name-boards of Serrinford's dead line the walls around a small oil lamp.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The shields of three rangers killed at Thornmouth hang fresh beside the shrine's entrance.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Offerings of bread, beer and a pinch of salt are left on a flat stone before the shrine.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The shrine-keeper lives in a hut beside the shrine, with a walled herb garden and drying racks.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Bunches of drying herbs hang from the keeper's rafters; the hut smells of mint and smoke.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The sick and hurt of Serrinford are brought to the shrine-keeper's hut to be tended.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Place
