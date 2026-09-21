import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const paulCardallTheHymnsCollection2DiscSet = {
  id: "01a0676a-d72d-702a-ac50-78b5b5cf30eb",
  type: "page-type/release",
  slug: "paul-cardall-the-hymns-collection-2-disc-set",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/paul-cardall"],
  position: 0,
  publishedAt: "2008-01-01",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5nMLSSi5QhzqRNAgpbLNFF",
      externalLink: "https://open.spotify.com/album/5nMLSSi5QhzqRNAgpbLNFF",
    },
  ],
  title: "The Hymns Collection (2 Disc Set)",
} as const satisfies Release
