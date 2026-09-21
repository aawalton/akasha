import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const coldplayGodPutASmileUponYourFace = {
  id: "01a0676a-d71f-700c-bbca-5ed038cf0147",
  type: "page-type/release",
  slug: "coldplay-god-put-a-smile-upon-your-face",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/coldplay"],
  position: 0,
  publishedAt: "2003-07-07",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5ZHXwTzxonEauEvYWIgBfw",
      externalLink: "https://open.spotify.com/album/5ZHXwTzxonEauEvYWIgBfw",
    },
  ],
  title: "God Put a Smile upon Your Face",
} as const satisfies Release
