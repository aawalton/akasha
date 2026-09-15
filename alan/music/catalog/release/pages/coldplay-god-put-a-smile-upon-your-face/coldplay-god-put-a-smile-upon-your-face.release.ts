import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const coldplayGodPutASmileUponYourFace = {
  id: "01a0676a-d71f-700c-bbca-5ed038cf0147",
  type: "release",
  slug: "coldplay-god-put-a-smile-upon-your-face",
  title: "God Put a Smile upon Your Face",
  partOfCollections: ["artist/coldplay"],
  position: 0,
  ownLength: 10.536417,
  ownProgress: 10.536417,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2003-07-07",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5ZHXwTzxonEauEvYWIgBfw",
      externalLink: "https://open.spotify.com/album/5ZHXwTzxonEauEvYWIgBfw",
    },
  ],
} as const satisfies Release
