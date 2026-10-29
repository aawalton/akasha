import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starWarsRebelsS03e19 = {
  id: "01a18853-ddfe-7579-9acc-36d9194e9634",
  type: "page-type/episode",
  slug: "star-wars-rebels-s03e19",
  description:
    "Reacting to a vision of Maul, Ezra defies Hera and Kanan to travel to a remote planet in hopes of stopping the former Sith lord from carrying out his plans.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-rebels-season-3"],
  position: 19,
  publishedAt: "2017-03-18",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1275776",
      externalLink: "https://www.themoviedb.org/tv/60554/season/3/episode/19",
    },
  ],
  title: "Twin Suns",
  episodeType: "standard",
  stillPath: "/AiURHBDFUsAjJajQzJ1rhRQJozh.jpg",
  voteAverage: 9.1,
  createdAt: "2026-10-29T15:42:40.123Z",
  updatedAt: "2026-10-29T15:42:40.123Z",
} as const satisfies Episode
