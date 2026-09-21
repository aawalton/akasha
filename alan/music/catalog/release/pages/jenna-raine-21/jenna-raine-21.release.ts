import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const jennaRaine21 = {
  id: "01a0676a-d714-7025-ae45-ac90e844e888",
  type: "page-type/release",
  slug: "jenna-raine-21",
  grade: "B",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/jenna-raine"],
  position: 0,
  publishedAt: "2025-02-21",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3qGEtrVl6JgkZTlKh9tlPX",
      externalLink: "https://open.spotify.com/album/3qGEtrVl6JgkZTlKh9tlPX",
    },
  ],
  title: "21",
} as const satisfies Release
