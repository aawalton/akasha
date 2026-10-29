import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS14e06 = {
  id: "01a1884b-ef74-734c-83b3-df687df5cb46",
  type: "page-type/episode",
  slug: "ncis-s14e06",
  description:
    "After a kidnapped Petty Officer escapes her captor, NCIS uncovers a connection to her missing husband.",
  ownLength: 42,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-14"],
  position: 6,
  publishedAt: "2016-10-25",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1234057",
      externalLink: "https://www.themoviedb.org/tv/4614/season/14/episode/6",
    },
  ],
  title: "Shell Game",
  episodeType: "standard",
  stillPath: "/fCW5LAcuTRlhazDazfdoydsvvPZ.jpg",
  voteAverage: 7.4,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
