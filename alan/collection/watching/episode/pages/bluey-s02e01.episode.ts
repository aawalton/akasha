import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const blueyS02e01 = {
  id: "01a18843-d14f-7691-afda-6132a4c675fd",
  type: "page-type/episode",
  slug: "bluey-s02e01",
  description:
    "After Dad eats her last chip, Bingo is given three chances to put Mum and Dad in 'Dance Mode' as payback. But the others can't resist taking Bingo's turns for her.",
  ownLength: 7,
  ownProgress: 0,
  partOfCollections: ["season/bluey-season-2"],
  position: 1,
  publishedAt: "2020-03-17",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2194075",
      externalLink: "https://www.themoviedb.org/tv/82728/season/2/episode/1",
    },
  ],
  title: "Dance Mode",
  episodeType: "standard",
  stillPath: "/yobiCpcOyolRxpVJJ0y9PYUIqZf.jpg",
  voteAverage: 6.7,
  createdAt: "2026-10-29T15:25:08.300Z",
  updatedAt: "2026-10-29T15:25:08.300Z",
} as const satisfies Episode
