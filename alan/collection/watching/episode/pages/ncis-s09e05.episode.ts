import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS09e05 = {
  id: "01a1884b-ef6e-7efc-a25e-f9f2c9019f22",
  type: "page-type/episode",
  slug: "ncis-s09e05",
  description:
    "When a coast guard officer is gunned down on a cargo vessel, the NCIS team searches for the killer, but finds a Lebanese family seeking refuge on American soil.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-9"],
  position: 5,
  publishedAt: "2011-10-18",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334595",
      externalLink: "https://www.themoviedb.org/tv/4614/season/9/episode/5",
    },
  ],
  title: "Safe Harbor",
  episodeType: "standard",
  stillPath: "/2VPG9bvbHZraTVIfZlFPZSBSETm.jpg",
  voteAverage: 7.7,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
