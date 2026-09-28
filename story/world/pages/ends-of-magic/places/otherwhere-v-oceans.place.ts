import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereVOceans = {
  id: "01a0e9fa-da96-73b5-8b6f-80d06c045a8c",
  type: "page-type/place",
  slug: "otherwhere-v-oceans",
  title: "The Oceans of Davrar",
  world: "world/ends-of-magic",
  facts: [
    {
      fact: "Davrar's oceans are enormous, and weeks or months of sailing part many continents.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Deep ocean travel is dangerous; a ship destroyed out there means death for all aboard.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Near land the oceans raise gigantic waves, often hundred-foot breakers higher than masts.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Ships cannot land on most coasts; passengers must fly ashore.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Ports survive by ancient artifacts that calm the waves, as at Litcliff and Keihona.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Fog and sharp-eyed lookouts let ships evade hunters on the open sea.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "At night the world above in the sky lights the ocean.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Vortices are places where the ocean drains down into the underworld.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Vortices are sources of powerful magic, haunted by the most aggressive leviathans.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Careful captains keep at least a thousand leagues from any vortex.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Sea routes can slip around bans that close a continent's land borders.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Place
