import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const emeiScatterbrainDeluxe = {
  id: "01a0676a-d728-7056-bc75-7340d9b2d360",
  type: "page-type/release",
  slug: "emei-scatterbrain-deluxe",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/emei"],
  position: 0,
  publishedAt: "2024-07-12",
  grade: "B",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0kb0Eq1AKUHztZpCJYUrZ5",
      externalLink: "https://open.spotify.com/album/0kb0Eq1AKUHztZpCJYUrZ5",
    },
  ],
  title: "Scatterbrain (Deluxe)",
  createdAt: "2026-09-03T13:17:30.280Z",
  updatedAt: "2026-09-21T19:44:25.000Z",
} as const satisfies Release
