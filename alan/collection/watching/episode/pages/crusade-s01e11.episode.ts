import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const crusadeS01e11 = {
  id: "01a18845-c75e-72a8-9e94-17f6d65a0d62",
  type: "page-type/episode",
  slug: "crusade-s01e11",
  description:
    "Gideon conducts an illegal raid to free a fugitive with information that could save Earth.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/crusade-season-1"],
  position: 11,
  publishedAt: "1999-08-18",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "147556",
      externalLink: "https://www.themoviedb.org/tv/2120/season/1/episode/11",
    },
  ],
  title: "The Needs of Earth",
  episodeType: "standard",
  stillPath: "/cxzvEhciLaamt3CLaX7WxbqkFjy.jpg",
  voteAverage: 5,
  createdAt: "2026-10-29T15:27:16.829Z",
  updatedAt: "2026-10-29T15:27:16.829Z",
} as const satisfies Episode
