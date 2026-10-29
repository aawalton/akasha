import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS16e16 = {
  id: "01a1884b-ef78-7c8b-af54-3f1b671db77f",
  type: "page-type/episode",
  slug: "ncis-s16e16",
  description:
    "Jimmy is torn between family and work after his father-in-law, Ed, asks him to tamper with evidence from NCIS’ current murder investigation. Also, Ed’s poker buddy, Anthony DiNozzo, Sr., offers to help with the case.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-16"],
  position: 16,
  publishedAt: "2019-03-12",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1703184",
      externalLink: "https://www.themoviedb.org/tv/4614/season/16/episode/16",
    },
  ],
  title: "Bears and Cubs",
  episodeType: "standard",
  stillPath: "/pUFa9SjeOz7L0Z0Hq7yRfZYZvC0.jpg",
  voteAverage: 7.5,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
