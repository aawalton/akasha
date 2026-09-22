import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const nickelCreek2LiveFromTheFoxTheater = {
  id: "01a0676a-d723-704e-ad9c-e7ea38a1d00b",
  type: "page-type/release",
  slug: "nickel-creek-2-live-from-the-fox-theater",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/nickel-creek"],
  position: 0,
  publishedAt: "2022-11-18",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7lq39QANQUHMNp0DVNqscQ",
      externalLink: "https://open.spotify.com/album/7lq39QANQUHMNp0DVNqscQ",
    },
  ],
  title: "Live from the Fox Theater",
} as const satisfies Release
