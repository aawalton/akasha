import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const hetaliaS04e03 = {
  id: "01a183d7-7ce5-7e5f-a476-fdc09905b70f",
  type: "page-type/episode",
  slug: "hetalia-s04e03",
  description:
    'The newspaper club goes on to interview the Nordic club, the Canada club, the elephant appreciation club, the music club, the swim team, and the... "Going Home" club?',
  ownLength: 5,
  ownProgress: 0,
  partOfCollections: ["season/hetalia-season-4"],
  position: 3,
  publishedAt: "2013-02-08",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1826966",
      externalLink: "https://www.themoviedb.org/tv/35138/season/4/episode/3",
    },
  ],
  title: "Gakuen Hetalia: Go Forth! Newspaper Club!! (2)",
  episodeType: "standard",
  voteAverage: 0,
  createdAt: "2026-10-28T18:48:19.934Z",
  updatedAt: "2026-10-28T18:48:19.934Z",
} as const satisfies Episode
