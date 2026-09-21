import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const paulCardallHymnsVol2 = {
  id: "01a0676a-d720-7083-89f6-24bdef534891",
  type: "page-type/release",
  slug: "paul-cardall-hymns-vol-2",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/paul-cardall"],
  position: 0,
  publishedAt: "2000-01-01",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7hugRuQpQpL5GPhjlz8OgB",
      externalLink: "https://open.spotify.com/album/7hugRuQpQpL5GPhjlz8OgB",
    },
  ],
  title: "Hymns, Vol. 2",
} as const satisfies Release
