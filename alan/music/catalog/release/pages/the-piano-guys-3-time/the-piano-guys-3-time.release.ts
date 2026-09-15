import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const thePianoGuys3Time = {
  id: "01a0676a-d72e-7042-8f64-cb8938373e4b",
  type: "page-type/release",
  slug: "the-piano-guys-3-time",
  title: "Time",
  partOfCollections: ["artist/the-piano-guys"],
  position: 0,
  ownLength: 4.2,
  ownProgress: 4.2,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2024-05-24",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1QmwaR2k2CCsacScss6dcW",
      externalLink: "https://open.spotify.com/album/1QmwaR2k2CCsacScss6dcW",
    },
  ],
} as const satisfies Release
