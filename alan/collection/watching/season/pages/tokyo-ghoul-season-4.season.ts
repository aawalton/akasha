import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const tokyoGhoulSeason4 = {
  id: "01a183d5-860a-7251-8763-381294a0223f",
  type: "page-type/season",
  slug: "tokyo-ghoul-season-4",
  description:
    "Following the Tsukiyama Extermination Operation, the conflict between the CCG and ghouls escalates as long-buried secrets begin to surface. With Ken Kaneki's memories returning and hidden forces manipulating events from the shadows, former allies and enemies alike are drawn into a final struggle that will determine the fate of both humans and ghouls.",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show/tokyo-ghoul"],
  position: 4,
  publishedAt: "2018-10-09",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "106990",
      externalLink: "https://www.themoviedb.org/tv/61374/season/4",
    },
  ],
  title: "Tokyo Ghoul:re  2nd Season",
  posterPath: "/wCn96kKQBRQhImMorf3napmCjfM.jpg",
  voteAverage: 8,
  createdAt: "2026-10-28T18:46:11.206Z",
  updatedAt: "2026-10-28T18:46:11.206Z",
} as const satisfies Season
