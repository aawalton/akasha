import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const paulCardallHymns = {
  id: "01a0676a-d720-7080-abe5-7456f0f7ed0b",
  type: "page-type/release",
  slug: "paul-cardall-hymns",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/paul-cardall"],
  position: 0,
  publishedAt: "1997-01-01",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6ZSL6JGJl6R6Ma6fPtqHfd",
      externalLink: "https://open.spotify.com/album/6ZSL6JGJl6R6Ma6fPtqHfd",
    },
  ],
  title: "Hymns",
} as const satisfies Release
