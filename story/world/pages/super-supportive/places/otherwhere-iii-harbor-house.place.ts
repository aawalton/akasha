import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereIiiHarborHouse = {
  id: "01a0ea7b-e9d1-718d-a074-98dd18e80f3a",
  type: "page-type/place",
  slug: "otherwhere-iii-harbor-house",
  title: "Harbor House",
  world: "world/super-supportive",
  facts: [
    {
      fact: "Harbor House is a women's shelter in an old church hall on Sunnyside Avenue, in Uptown.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "It is a ten-minute walk from the Uptown Memorial ER.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "It sleeps forty women in bunk rooms, with showers and padlocked lockers.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Doors open at five in the evening; dinner at six, lights out at ten.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Breakfast is at six-thirty, and everyone must be out by half past seven.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Intake asks for a name only; no ID is needed.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "No drugs, no drink and no men past the lobby; a staffer is awake all night.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A bed the social worker reserves is held until seven; a no-show loses it.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  within: "place/otherwhere-iii-chicago",
} as const satisfies Place
