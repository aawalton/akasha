import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starWarsRebelsS03e02 = {
  id: "01a18853-ddfd-7334-8fc8-f9ee41e8b93c",
  type: "page-type/episode",
  slug: "star-wars-rebels-s03e02",
  description:
    "When Maul takes the crew of the Ghost hostage, Ezra and Kanan must pass a trial in order to recover an ancient Sith artifact to save them.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-rebels-season-3"],
  position: 2,
  publishedAt: "2016-10-01",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1228085",
      externalLink: "https://www.themoviedb.org/tv/60554/season/3/episode/2",
    },
  ],
  title: "The Holocrons of Fate",
  episodeType: "standard",
  stillPath: "/t8QRYKtTdVvMOnqrXFqHcc7PUUl.jpg",
  voteAverage: 8.3,
  createdAt: "2026-10-29T15:42:40.123Z",
  updatedAt: "2026-10-29T15:42:40.123Z",
} as const satisfies Episode
