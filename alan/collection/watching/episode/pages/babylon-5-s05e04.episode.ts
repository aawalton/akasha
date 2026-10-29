import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const babylon5S05e04 = {
  id: "01a18843-5083-7ce7-8376-5b75001f562a",
  type: "page-type/episode",
  slug: "babylon-5-s05e04",
  description:
    "We see the action from the viewpoint of two maintenance workers as a race of savage aliens attacks the station.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/babylon-5-wheel-of-fire"],
  position: 4,
  publishedAt: "1998-02-11",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "235902",
      externalLink: "https://www.themoviedb.org/tv/3137/season/5/episode/4",
    },
  ],
  title: "A View from the Gallery",
  episodeType: "standard",
  stillPath: "/jsmRYDev5gucTOQ9Fspu6vkdKRv.jpg",
  voteAverage: 7,
  createdAt: "2026-10-29T15:24:35.325Z",
  updatedAt: "2026-10-29T15:24:35.325Z",
} as const satisfies Episode
