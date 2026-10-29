import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starWarsRebelsS03e06 = {
  id: "01a18853-ddfe-7fb0-9fbd-ea316514d07f",
  type: "page-type/episode",
  slug: "star-wars-rebels-s03e06",
  description:
    "Having lost contact with the Protectors of Concord Dawn, Sabine, Ezra, and Fenn Rau investigate and find the base occupied by Imperial Mandalorians.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-rebels-season-3"],
  position: 6,
  publishedAt: "2016-11-05",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1236897",
      externalLink: "https://www.themoviedb.org/tv/60554/season/3/episode/6",
    },
  ],
  title: "Imperial Supercommandos",
  episodeType: "standard",
  stillPath: "/h0ZbQtb5bjWnptrRI99ykYTf6h4.jpg",
  voteAverage: 7.4,
  createdAt: "2026-10-29T15:42:40.123Z",
  updatedAt: "2026-10-29T15:42:40.123Z",
} as const satisfies Episode
