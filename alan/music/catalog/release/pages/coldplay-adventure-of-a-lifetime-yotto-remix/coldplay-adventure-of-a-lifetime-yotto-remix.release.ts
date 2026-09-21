import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const coldplayAdventureOfALifetimeYottoRemix = {
  id: "01a0676a-d716-7001-a9c9-3c9b9e0fe801",
  type: "page-type/release",
  slug: "coldplay-adventure-of-a-lifetime-yotto-remix",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/coldplay"],
  position: 0,
  publishedAt: "2016-03-28",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6HtLkpRPDhS1wUcDzE50hd",
      externalLink: "https://open.spotify.com/album/6HtLkpRPDhS1wUcDzE50hd",
    },
  ],
  title: "Adventure of a Lifetime (Yotto Remix)",
} as const satisfies Release
