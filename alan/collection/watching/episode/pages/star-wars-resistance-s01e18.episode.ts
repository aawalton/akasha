import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starWarsResistanceS01e18 = {
  id: "01a18853-f9af-7d9c-9028-272528bb8fbf",
  type: "page-type/episode",
  slug: "star-wars-resistance-s01e18",
  description:
    "With secrets exposed, Yeager's crew must evade relentless troopers hunting them down and find a way to reach the Resistance.",
  ownLength: 25,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-resistance-season-1"],
  position: 18,
  publishedAt: "2019-03-03",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1715375",
      externalLink: "https://www.themoviedb.org/tv/79093/season/1/episode/18",
    },
  ],
  title: "Descent",
  episodeType: "standard",
  stillPath: "/8Ua69aFbuq0jPtE5NSS9ZaGGWBs.jpg",
  voteAverage: 7.3,
  createdAt: "2026-10-29T15:42:47.214Z",
  updatedAt: "2026-10-29T15:42:47.214Z",
} as const satisfies Episode
