import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starWarsResistanceS01e03 = {
  id: "01a18853-f9af-7011-9ac4-053b58ce9d85",
  type: "page-type/episode",
  slug: "star-wars-resistance-s01e03",
  description:
    "Kaz befriends a sky racer named Rucklin who pressures him to take some rare and dangerous hyperfuel hidden in Yeager’s office.",
  ownLength: 25,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-resistance-season-1"],
  position: 3,
  publishedAt: "2018-10-21",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1589108",
      externalLink: "https://www.themoviedb.org/tv/79093/season/1/episode/3",
    },
  ],
  title: "Fuel for the Fire",
  episodeType: "standard",
  stillPath: "/erukYVaZmEjwZOGNwbbcTrouakK.jpg",
  voteAverage: 6,
  createdAt: "2026-10-29T15:42:47.214Z",
  updatedAt: "2026-10-29T15:42:47.214Z",
} as const satisfies Episode
