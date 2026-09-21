import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const jessicaBaioTakeItBack = {
  id: "01a0676a-d72b-7012-8fa2-ef436123ae9f",
  type: "page-type/release",
  slug: "jessica-baio-take-it-back",
  grade: "B",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/jessica-baio"],
  position: 0,
  publishedAt: "2023-08-18",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "249kr54CdzGvjgsFBuimWU",
      externalLink: "https://open.spotify.com/album/249kr54CdzGvjgsFBuimWU",
    },
  ],
  title: "take it back",
} as const satisfies Release
