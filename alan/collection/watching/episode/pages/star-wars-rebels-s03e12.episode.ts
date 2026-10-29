import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starWarsRebelsS03e12 = {
  id: "01a18853-ddfe-7719-9a19-53e115bf33c6",
  type: "page-type/episode",
  slug: "star-wars-rebels-s03e12",
  description:
    "After finding a missing rebel team member, the Ghost crew discovers another surprise on Geonosis, and work to conceal it from Imperial Forces.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-rebels-season-3"],
  position: 12,
  publishedAt: "2017-01-07",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1253948",
      externalLink: "https://www.themoviedb.org/tv/60554/season/3/episode/12",
    },
  ],
  title: "Ghosts of Geonosis (2)",
  episodeType: "standard",
  stillPath: "/edCZ7r1Cs4tgKSbiPj1qr0UdCwQ.jpg",
  voteAverage: 7.6,
  createdAt: "2026-10-29T15:42:40.123Z",
  updatedAt: "2026-10-29T15:42:40.123Z",
} as const satisfies Episode
