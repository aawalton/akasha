import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const ledZeppelinHousesOfTheHolyDeluxeEdition = {
  id: "01a0676a-d720-7068-98b0-b08a1fd1098e",
  type: "release",
  slug: "led-zeppelin-houses-of-the-holy-deluxe-edition",
  title: "Houses of the Holy (Deluxe Edition)",
  partOfCollections: ["artist/led-zeppelin"],
  position: 0,
  ownLength: 77.168217,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "1973-03-28",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7gS8ozSkvPW3VBPLnXOZ7S",
      externalLink: "https://open.spotify.com/album/7gS8ozSkvPW3VBPLnXOZ7S",
    },
  ],
} as const satisfies Release
