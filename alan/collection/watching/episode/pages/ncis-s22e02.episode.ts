import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS22e02 = {
  id: "01a1884b-ef83-73b9-b6a2-d1e05277cdfe",
  type: "page-type/episode",
  slug: "ncis-s22e02",
  description:
    "As Vance prepares to host diplomatic talks with Venezuela, the team is called in to investigate the dead body of one of his inside men.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-22"],
  position: 2,
  publishedAt: "2024-10-21",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "5474676",
      externalLink: "https://www.themoviedb.org/tv/4614/season/22/episode/2",
    },
  ],
  title: "Foreign Bodies",
  episodeType: "standard",
  stillPath: "/xVfCbKUKD0d4TGafq4QgH3p5o3N.jpg",
  voteAverage: 8.6,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
