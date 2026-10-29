import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisLosAngelesS01e20 = {
  id: "01a1884a-e0e8-71c7-9dad-6e2f5f1c251f",
  type: "page-type/episode",
  slug: "ncis-los-angeles-s01e20",
  description:
    "NCIS investigates the murder of a Navy officer entangled in the world of Hollywood glitz and glamour as the team is joined at Hetty's request by LAPD liaison Marty Deeks.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-los-angeles-season-1"],
  position: 20,
  publishedAt: "2010-04-27",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "557295",
      externalLink: "https://www.themoviedb.org/tv/17610/season/1/episode/20",
    },
  ],
  title: "Fame",
  episodeType: "standard",
  stillPath: "/ySDwVgLG2O1a6IByest6e1IjBr9.jpg",
  voteAverage: 7.6,
  createdAt: "2026-10-29T15:32:51.047Z",
  updatedAt: "2026-10-29T15:32:51.047Z",
} as const satisfies Episode
