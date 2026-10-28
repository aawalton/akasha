import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const narutoS01e32 = {
  id: "01a183d1-bb4c-7148-aebc-5de808e3db5a",
  type: "page-type/episode",
  slug: "naruto-s01e32",
  description:
    "Lee in his weakened state is having trouble defeating Dosu. Sakura realises everyone has been protecting her until now and that its her time to protect them! Can Sakura succeed where even Lee failed?",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/naruto-season-1"],
  position: 32,
  publishedAt: "2003-05-07",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "908157",
      externalLink: "https://www.themoviedb.org/tv/46260/season/1/episode/32",
    },
  ],
  title: "Sakura Blossoms!",
  episodeType: "standard",
  stillPath: "/upF0XMGkN88cNW5EJ9Fcvrn3BjK.jpg",
  voteAverage: 7.6,
  createdAt: "2026-10-28T18:42:02.697Z",
  updatedAt: "2026-10-28T18:42:02.697Z",
} as const satisfies Episode
