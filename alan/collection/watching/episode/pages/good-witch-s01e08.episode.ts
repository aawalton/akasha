import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const goodWitchS01e08 = {
  id: "01a18849-3527-73d1-a4ef-4ef43c232b9e",
  type: "page-type/episode",
  slug: "good-witch-s01e08",
  description:
    'Cassie receives devastating news regarding the future of Bell, Book and Candle; the whole town comes together. (This was originally broadcast as a double-length final episode of Season 1, while later it was known as the combination of "Homecoming" for the first half and "True Colors" for the second half, such as on the DVD release)',
  ownLength: 82,
  ownProgress: 0,
  partOfCollections: ["season/good-witch-season-1"],
  position: 8,
  publishedAt: "2015-04-18",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1051585",
      externalLink: "https://www.themoviedb.org/tv/61864/season/1/episode/8",
    },
  ],
  title: "True Colors",
  episodeType: "standard",
  stillPath: "/da5BlJcAsIbnzBzC4I3KQZT71JX.jpg",
  voteAverage: 5.5,
  createdAt: "2026-10-29T15:31:01.543Z",
  updatedAt: "2026-10-29T15:31:01.543Z",
} as const satisfies Episode
