import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const stevenUniverseS03e20 = {
  id: "01a18855-67e9-78ff-92f4-78a1bb8be844",
  type: "page-type/episode",
  slug: "steven-universe-s03e20",
  description:
    "Steven discovers something the Gems thought was lost to the past inside of Lion's mane.",
  ownLength: 22,
  ownProgress: 0,
  partOfCollections: ["season/steven-universe-season-3"],
  position: 20,
  publishedAt: "2016-08-04",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1211741",
      externalLink: "https://www.themoviedb.org/tv/61175/season/3/episode/20",
    },
  ],
  title: "Bismuth",
  episodeType: "standard",
  stillPath: "/5EUi0NOe18xKHvazQi3hfLqbcRa.jpg",
  voteAverage: 8.4,
  createdAt: "2026-10-29T15:44:20.963Z",
  updatedAt: "2026-10-29T15:44:20.963Z",
} as const satisfies Episode
