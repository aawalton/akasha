import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const thePunisherS01e01 = {
  id: "01a18857-ec89-7dab-ba82-cd3fa02ba941",
  type: "page-type/episode",
  slug: "the-punisher-s01e01",
  description:
    "Former Marine Frank Castle takes the law into his own hands while struggling to come to terms with his traumatic past.",
  ownLength: 52,
  ownProgress: 0,
  partOfCollections: ["season/marvel-s-the-punisher-season-1"],
  position: 1,
  publishedAt: "2017-11-17",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1209036",
      externalLink: "https://www.themoviedb.org/tv/67178/season/1/episode/1",
    },
  ],
  title: "3AM",
  episodeType: "standard",
  stillPath: "/9oeaQQZosQfaDdCO50yrrGtzT6W.jpg",
  voteAverage: 8.2,
  createdAt: "2026-10-29T15:47:05.993Z",
  updatedAt: "2026-10-29T15:47:05.993Z",
} as const satisfies Episode
