import type { Release } from "akasha/alan/music/catalog/releases/release.page-type.types.ts"

export const pentatonixPrayersForThisWorld = {
  id: "01a0676a-d727-7014-b878-e26b35287db7",
  type: "release",
  slug: "pentatonix-prayers-for-this-world",
  title: "Prayers For This World",
  partOfCollections: ["artist/pentatonix"],
  position: 0,
  ownLength: 3.707767,
  ownProgress: 3.707767,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2022-09-23",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6e4ASUu9fUIw2QBGppK4Qb",
      externalLink: "https://open.spotify.com/album/6e4ASUu9fUIw2QBGppK4Qb",
    },
  ],
} as const satisfies Release
