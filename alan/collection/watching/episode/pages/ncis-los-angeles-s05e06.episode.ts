import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisLosAngelesS05e06 = {
  id: "01a1884a-e0ed-7813-899a-ba0d56a02cde",
  type: "page-type/episode",
  slug: "ncis-los-angeles-s05e06",
  description:
    "When a 15-year-old hacker compromises missions, Callen goes under cover at a prestigious high school.",
  ownLength: 41,
  ownProgress: 0,
  partOfCollections: ["season/ncis-los-angeles-season-5"],
  position: 6,
  publishedAt: "2013-10-29",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "968355",
      externalLink: "https://www.themoviedb.org/tv/17610/season/5/episode/6",
    },
  ],
  title: "Big Brother",
  episodeType: "standard",
  stillPath: "/fVMEwf0OJEwZXHRIicdZtllDLiv.jpg",
  voteAverage: 7.5,
  createdAt: "2026-10-29T15:32:51.047Z",
  updatedAt: "2026-10-29T15:32:51.047Z",
} as const satisfies Episode
