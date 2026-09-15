import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const jessicaBaioTakeItBack = {
  id: "01a0676a-d72b-7012-8fa2-ef436123ae9f",
  type: "page-type/release",
  slug: "jessica-baio-take-it-back",
  title: "take it back",
  partOfCollections: ["artist/jessica-baio"],
  position: 0,
  ownLength: 4.904117,
  ownProgress: 4.904117,
  unit: "unit/minutes",
  status: "completed",
  rank: "B",
  publishedAt: "2023-08-18",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "249kr54CdzGvjgsFBuimWU",
      externalLink: "https://open.spotify.com/album/249kr54CdzGvjgsFBuimWU",
    },
  ],
} as const satisfies Release
