import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starWarsRebelsS04e03 = {
  id: "01a18853-ddff-756e-a2a7-d9aca8033178",
  type: "page-type/episode",
  slug: "star-wars-rebels-s04e03",
  description:
    "As members of the Rebel Alliance, Ezra and the Ghost crew must accept a mission to spy on an Imperial outpost they would rather destroy.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-rebels-season-4"],
  position: 3,
  publishedAt: "2017-10-23",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1382170",
      externalLink: "https://www.themoviedb.org/tv/60554/season/4/episode/3",
    },
  ],
  title: "In the Name of the Rebellion (1)",
  episodeType: "standard",
  stillPath: "/6Fkkkj4D7yrJbxYab4XVjmta0NC.jpg",
  voteAverage: 7.6,
  createdAt: "2026-10-29T15:42:40.123Z",
  updatedAt: "2026-10-29T15:42:40.123Z",
} as const satisfies Episode
