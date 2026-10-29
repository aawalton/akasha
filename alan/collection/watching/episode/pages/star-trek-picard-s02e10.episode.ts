import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekPicardS02e10 = {
  id: "01a18853-07cf-7db6-a3ab-003bae0a49c1",
  type: "page-type/episode",
  slug: "star-trek-picard-s02e10",
  description:
    "With just hours until the Europa launch, Picard and the crew find themselves in a race against time to save the future.",
  ownLength: 49,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-picard-season-2"],
  position: 10,
  publishedAt: "2022-05-05",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "3651755",
      externalLink: "https://www.themoviedb.org/tv/85949/season/2/episode/10",
    },
  ],
  title: "Farewell",
  episodeType: "finale",
  stillPath: "/gCcEaWxnvTsHvAqHqbIBz2uyHT9.jpg",
  voteAverage: 6.5,
  createdAt: "2026-10-29T15:41:45.292Z",
  updatedAt: "2026-10-29T15:41:45.292Z",
} as const satisfies Episode
