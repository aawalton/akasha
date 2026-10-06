import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const encountersRoyalPacificLounge = {
  id: "01a11358-176e-783d-ba8c-834a8d80a890",
  type: "page-type/place",
  slug: "encounters-royal-pacific-lounge",
  title: "Orchid Court Lounge at the Royal Pacific",
  world: "world/encounters",
  facts: [
    {
      fact: "The Royal Pacific is a 1930s South Seas-themed Universal hotel, a short walk from CityWalk.",
      knowers: ["lore-disclosure/game-master", "character-player/encounters-alan"],
    },
    {
      fact: "Orchid Court Lounge is the Royal Pacific's lobby bar, under a glass roof among orchids and palms.",
      knowers: ["lore-disclosure/game-master", "character-player/encounters-alan"],
    },
    {
      fact: "The lounge serves sushi and cocktails at low rattan chairs, beside the lobby's fountain.",
      knowers: ["lore-disclosure/game-master", "character-player/encounters-alan"],
    },
  ],
} as const satisfies Place
