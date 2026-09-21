import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const coldplayAdventureOfALifetimeMatomaRemix = {
  id: "01a0676a-d716-7000-9fb4-143b796d4067",
  type: "page-type/release",
  slug: "coldplay-adventure-of-a-lifetime-matoma-remix",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/coldplay"],
  position: 0,
  publishedAt: "2015-12-03",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1TbYQD52H9tKtZine3mHHJ",
      externalLink: "https://open.spotify.com/album/1TbYQD52H9tKtZine3mHHJ",
    },
  ],
  title: "Adventure of a Lifetime (Matoma Remix)",
} as const satisfies Release
