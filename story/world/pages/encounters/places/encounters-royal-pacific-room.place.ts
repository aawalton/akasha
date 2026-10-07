import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const encountersRoyalPacificRoom = {
  id: "01a11358-176f-7abd-bed4-e6646273071f",
  type: "page-type/place",
  slug: "encounters-royal-pacific-room",
  title: "Alan's room at the Royal Pacific",
  world: "world/encounters",
  facts: [
    {
      fact: "Alan's room is a standard room on an upper floor of the Royal Pacific, with one king bed.",
      knowers: ["lore-disclosure/game-master", "character-player/encounters-alan"],
    },
    {
      fact: "The room is bamboo, dark wood and Polynesian prints, with a desk and a deep armchair.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/encounters-alan",
        "character-other/encounters-kenzie",
      ],
    },
    {
      fact: "The window looks down over the hotel's lagoon pool and its palms.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/encounters-alan",
        "character-other/encounters-kenzie",
        "character-other/encounters-priya",
        "character-other/encounters-hana",
      ],
    },
    {
      fact: "The room has a mini fridge, a coffee maker, and a bathroom with a tub and shower.",
      knowers: ["lore-disclosure/game-master", "character-player/encounters-alan"],
    },
    {
      fact: "Alan texted Hana that his room is at the Royal Pacific, and gave her its number.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/encounters-alan",
        "character-other/encounters-hana",
      ],
    },
    {
      fact: "The room's mini fridge sits under the desk, stocked with seven-dollar bottles of water.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/encounters-alan",
        "character-other/encounters-kenzie",
      ],
    },
  ],
} as const satisfies Place
