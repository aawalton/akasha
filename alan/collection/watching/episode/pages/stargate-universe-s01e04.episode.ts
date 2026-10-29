import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const stargateUniverseS01e04 = {
  id: "01a18855-262f-7bdb-9ffc-0799dbba9b0b",
  type: "page-type/episode",
  slug: "stargate-universe-s01e04",
  description:
    "The Destiny suffers a power crisis, putting the lives of the stranded crew in jeopardy and forcing them to consider abandoning the ship.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/stargate-universe-season-1"],
  position: 4,
  publishedAt: "2009-10-16",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "353514",
      externalLink: "https://www.themoviedb.org/tv/5148/season/1/episode/4",
    },
  ],
  title: "Darkness",
  episodeType: "standard",
  stillPath: "/hhzo9FS5zZVMTvRSzsEVfu10cZA.jpg",
  voteAverage: 7.2,
  createdAt: "2026-10-29T15:44:04.143Z",
  updatedAt: "2026-10-29T15:44:04.143Z",
} as const satisfies Episode
