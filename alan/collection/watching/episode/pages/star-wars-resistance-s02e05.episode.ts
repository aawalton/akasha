import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starWarsResistanceS02e05 = {
  id: "01a18853-f9b0-7402-9692-a1234425a996",
  type: "page-type/episode",
  slug: "star-wars-resistance-s02e05",
  description:
    "Kaz and Neeku discover Nena, a Nikto engineer in need of assistance who barely escaped a First Order attack.",
  ownLength: 26,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-resistance-season-2"],
  position: 5,
  publishedAt: "2019-11-03",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1957458",
      externalLink: "https://www.themoviedb.org/tv/79093/season/2/episode/5",
    },
  ],
  title: "The Engineer",
  episodeType: "standard",
  stillPath: "/caoXtSTLt727qGRRoX4wV88O3zO.jpg",
  voteAverage: 6.9,
  createdAt: "2026-10-29T15:42:47.214Z",
  updatedAt: "2026-10-29T15:42:47.214Z",
} as const satisfies Episode
