import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const coldplayHypnotised = {
  id: "01a0676a-d720-7084-b07d-4a4dbb2b86ee",
  type: "page-type/release",
  slug: "coldplay-hypnotised",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/coldplay"],
  position: 0,
  publishedAt: "2017-03-02",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "165kxlULHc34us8oU420iw",
      externalLink: "https://open.spotify.com/album/165kxlULHc34us8oU420iw",
    },
  ],
  title: "Hypnotised",
} as const satisfies Release
