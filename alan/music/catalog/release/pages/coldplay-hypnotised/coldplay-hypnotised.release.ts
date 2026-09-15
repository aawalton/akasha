import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const coldplayHypnotised = {
  id: "01a0676a-d720-7084-b07d-4a4dbb2b86ee",
  type: "release",
  slug: "coldplay-hypnotised",
  title: "Hypnotised",
  partOfCollections: ["artist/coldplay"],
  position: 0,
  ownLength: 5.919533,
  ownProgress: 5.919533,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2017-03-02",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "165kxlULHc34us8oU420iw",
      externalLink: "https://open.spotify.com/album/165kxlULHc34us8oU420iw",
    },
  ],
} as const satisfies Release
