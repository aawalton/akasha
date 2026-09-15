import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const paulCardallHymnsVol2 = {
  id: "01a0676a-d720-7083-89f6-24bdef534891",
  type: "release",
  slug: "paul-cardall-hymns-vol-2",
  title: "Hymns, Vol. 2",
  partOfCollections: ["artist/paul-cardall"],
  position: 0,
  ownLength: 45.534233,
  ownProgress: 45.534233,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2000-01-01",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7hugRuQpQpL5GPhjlz8OgB",
      externalLink: "https://open.spotify.com/album/7hugRuQpQpL5GPhjlz8OgB",
    },
  ],
} as const satisfies Release
