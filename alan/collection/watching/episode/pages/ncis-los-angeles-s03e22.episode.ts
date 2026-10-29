import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisLosAngelesS03e22 = {
  id: "01a1884a-e0eb-79d5-bfef-3ccf6136da42",
  type: "page-type/episode",
  slug: "ncis-los-angeles-s03e22",
  description:
    "Kensi and Deeks are sent undercover as married couple Melissa and Justin when evidence points to a Russian sleeper cell in a suburban neighborhood.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-los-angeles-season-3"],
  position: 22,
  publishedAt: "2012-05-08",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "557347",
      externalLink: "https://www.themoviedb.org/tv/17610/season/3/episode/22",
    },
  ],
  title: "Neighborhood Watch",
  episodeType: "standard",
  stillPath: "/8hX0Qcc2FFzYogx1IeAdJmSmqd0.jpg",
  voteAverage: 5,
  createdAt: "2026-10-29T15:32:51.047Z",
  updatedAt: "2026-10-29T15:32:51.047Z",
} as const satisfies Episode
