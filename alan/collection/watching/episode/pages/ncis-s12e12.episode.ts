import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS12e12 = {
  id: "01a1884b-ef72-7635-a706-e09c11def0ce",
  type: "page-type/episode",
  slug: "ncis-s12e12",
  description:
    "The NCIS team searches for a home-grown terrorist after a rescue mission in Syria reveals an American was involved in the capture of a social worker.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-12"],
  position: 12,
  publishedAt: "2015-01-13",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1027522",
      externalLink: "https://www.themoviedb.org/tv/4614/season/12/episode/12",
    },
  ],
  title: "The Enemy Within",
  episodeType: "standard",
  stillPath: "/noSj19STW6UxCxsiYhiTw3zXBwo.jpg",
  voteAverage: 7.6,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
