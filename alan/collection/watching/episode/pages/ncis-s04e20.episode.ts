import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS04e20 = {
  id: "01a1884b-ef67-7380-97d5-210ffa6c0f98",
  type: "page-type/episode",
  slug: "ncis-s04e20",
  description:
    "McGee is under high pressure during the murder investigation of a Petty Officer based on the character for his latest book, with very little information to go on.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-4"],
  position: 20,
  publishedAt: "2007-04-10",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334488",
      externalLink: "https://www.themoviedb.org/tv/4614/season/4/episode/20",
    },
  ],
  title: "Cover Story",
  episodeType: "standard",
  stillPath: "/2Fy6oX4NrENlSwpQWGlPe5Amo8k.jpg",
  voteAverage: 7.1,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
