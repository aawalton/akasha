import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const haremHotelFloor1 = {
  id: "01a0e839-1d45-7f73-8fd6-eb4e4e6f7e63",
  type: "page-type/place",
  slug: "harem-hotel-floor-1",
  title: "Floor 1: The Lobby",
  world: "world/harem-hotel",
  facts: [
    {
      fact: "Floor 1 is the lobby of a grand old hotel, all dark wood, brass and oxblood velvet.",
      knowers: ["lore-disclosure/game-master", "character-player/harem-hotel-alan"],
    },
    {
      fact: "A crystal chandelier and green-shaded lamps light the lobby.",
      knowers: ["lore-disclosure/game-master", "character-player/harem-hotel-alan"],
    },
    {
      fact: "Alan wakes dressed on a velvet chaise longue mid-lobby, with no memory of arriving.",
      knowers: ["lore-disclosure/game-master", "character-player/harem-hotel-alan"],
    },
    {
      fact: "The revolving front doors turn onto bare brick, and every window shows brick behind the glass.",
      knowers: ["lore-disclosure/game-master", "character-player/harem-hotel-alan"],
    },
    {
      fact: "A grand staircase rises at the back of the lobby behind a locked brass gate.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/harem-hotel-alan",
        "character-other/harem-hotel-wren",
      ],
    },
    {
      fact: "The brass gate opens only once floor 1's task is met.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/harem-hotel-alan",
        "character-other/harem-hotel-odile",
        "character-other/harem-hotel-wren",
      ],
    },
    {
      fact: "The lift beside the staircase has no buttons, and its doors never open.",
      knowers: ["lore-disclosure/game-master", "character-player/harem-hotel-alan"],
    },
    {
      fact: "The front desk is a long counter of black marble with a brass service bell.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/harem-hotel-alan",
        "character-other/harem-hotel-odile",
      ],
    },
    {
      fact: "Behind the front desk is a wall of empty key pigeonholes.",
      knowers: ["lore-disclosure/game-master", "character-player/harem-hotel-alan"],
    },
    {
      fact: "An open leather guest book on the desk holds one line: Alan's name, in the concierge's hand.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The lobby holds a leather sofa, the chaise, a brass luggage cart, and a rug before a cold hearth.",
      knowers: ["lore-disclosure/game-master", "character-player/harem-hotel-alan"],
    },
    {
      fact: "Floor 1 holds two women: Odile as the concierge at the front desk, and Wren as the bellhop.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/harem-hotel-alan",
        "character-other/harem-hotel-odile",
        "character-other/harem-hotel-wren",
      ],
    },
    {
      fact: "The bellhop waits by the luggage cart, and the concierge gives her orders across the lobby.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/harem-hotel-alan",
        "character-other/harem-hotel-odile",
        "character-other/harem-hotel-wren",
      ],
    },
    {
      fact: "The concierge wears a fitted black tailcoat and waistcoat over a white shirt, and a black skirt.",
      knowers: ["lore-disclosure/game-master", "character-player/harem-hotel-alan"],
    },
    {
      fact: "Floor 1's task: make the concierge and the bellhop both come, then come inside one of them.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/harem-hotel-alan",
        "character-other/harem-hotel-odile",
        "character-other/harem-hotel-wren",
      ],
    },
    {
      fact: "The concierge states the task to Alan plainly, as his check-in, once he is on his feet.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/harem-hotel-alan",
        "character-other/harem-hotel-odile",
        "character-other/harem-hotel-wren",
      ],
    },
    {
      fact: "The women of the tower know their own floor's task and nothing of the floors above.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Place
