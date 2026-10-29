import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisLosAngelesS03e02 = {
  id: "01a1884a-e0ea-75a7-a5d7-ba80077278cf",
  type: "page-type/episode",
  slug: "ncis-los-angeles-s03e02",
  description:
    "The NCIS team joins forces with the NSA to find the creator and controller of a software program linked to a cyber attack against the Department of Defense. Meanwhile, Callen continues searching for more information about his past.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-los-angeles-season-3"],
  position: 2,
  publishedAt: "2011-09-27",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "557327",
      externalLink: "https://www.themoviedb.org/tv/17610/season/3/episode/2",
    },
  ],
  title: "Cyber Threat",
  episodeType: "standard",
  stillPath: "/zTwZoXnNCB1THi5DGduOmiJgWBw.jpg",
  voteAverage: 7.2,
  createdAt: "2026-10-29T15:32:51.047Z",
  updatedAt: "2026-10-29T15:32:51.047Z",
} as const satisfies Episode
