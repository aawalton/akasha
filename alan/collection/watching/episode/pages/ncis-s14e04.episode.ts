import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS14e04 = {
  id: "01a1884b-ef74-70d8-ac62-7653fc630911",
  type: "page-type/episode",
  slug: "ncis-s14e04",
  description:
    "After the body of a Navy Lieutenant is discovered aboard a destroyer during a tiger cruise, when civilian guests are allowed to spend the night on the ship, Gibbs, Quinn, and Palmer travel out to sea to investigate.",
  ownLength: 42,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-14"],
  position: 4,
  publishedAt: "2016-10-11",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1230197",
      externalLink: "https://www.themoviedb.org/tv/4614/season/14/episode/4",
    },
  ],
  title: "Love Boat",
  episodeType: "standard",
  stillPath: "/n1E1LcadNZ3j2qDVa3J8Zjwf0g5.jpg",
  voteAverage: 7.2,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
