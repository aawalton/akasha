import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starWarsResistanceS01e08 = {
  id: "01a18853-f9af-725d-bd61-927b6ce7581a",
  type: "page-type/episode",
  slug: "star-wars-resistance-s01e08",
  description:
    "An upcoming race reunites Yeager with his estranged brother, Marcus, who needs to win to pay off his debt to a criminal organization.",
  ownLength: 25,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-resistance-season-1"],
  position: 8,
  publishedAt: "2018-11-25",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1598482",
      externalLink: "https://www.themoviedb.org/tv/79093/season/1/episode/8",
    },
  ],
  title: "The Platform Classic",
  episodeType: "standard",
  stillPath: "/6VYj5EPm0hRfm8jf8QftgzAZkQx.jpg",
  voteAverage: 6.5,
  createdAt: "2026-10-29T15:42:47.214Z",
  updatedAt: "2026-10-29T15:42:47.214Z",
} as const satisfies Episode
