import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const emeiScatterbrainDeluxe = {
  id: "01a0676a-d728-7056-bc75-7340d9b2d360",
  type: "release",
  slug: "emei-scatterbrain-deluxe",
  title: "Scatterbrain (Deluxe)",
  partOfCollections: ["artist/emei"],
  position: 0,
  ownLength: 23.114167,
  ownProgress: 23.114167,
  unit: "unit/minutes",
  status: "completed",
  rank: "B",
  publishedAt: "2024-07-12",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0kb0Eq1AKUHztZpCJYUrZ5",
      externalLink: "https://open.spotify.com/album/0kb0Eq1AKUHztZpCJYUrZ5",
    },
  ],
} as const satisfies Release
