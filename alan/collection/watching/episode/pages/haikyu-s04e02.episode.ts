import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const haikyuS04e02 = {
  id: "01a183d2-cc4b-7668-93f7-c80b6bc3d8e8",
  type: "page-type/episode",
  slug: "haikyu-s04e02",
  description:
    "Just one more month until the Spring Tournament. Hinata crashed the Miyagi Prefecture Rookie Select Training Camp and got to stay as one of their ball boys. While the boys are doing a practice match, the third-year players from Shiratorizawa show up.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/haikyu-season-4"],
  position: 2,
  publishedAt: "2020-01-18",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2052013",
      externalLink: "https://www.themoviedb.org/tv/60863/season/4/episode/2",
    },
  ],
  title: "Lost",
  episodeType: "standard",
  stillPath: "/6iPILutW52r07MBQxIt3WRYJC8v.jpg",
  voteAverage: 7.7,
  createdAt: "2026-10-28T18:43:12.581Z",
  updatedAt: "2026-10-28T18:43:12.581Z",
} as const satisfies Episode
