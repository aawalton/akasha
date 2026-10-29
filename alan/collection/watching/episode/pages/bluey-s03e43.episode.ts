import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const blueyS03e43 = {
  id: "01a18843-d156-78fd-80c3-a302b46d3485",
  type: "page-type/episode",
  slug: "bluey-s03e43",
  description: "Bluey asks Dad to help her draw a dragon for her story.",
  ownLength: 8,
  ownProgress: 0,
  partOfCollections: ["season/bluey-season-3"],
  position: 43,
  publishedAt: "2023-05-14",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4215669",
      externalLink: "https://www.themoviedb.org/tv/82728/season/3/episode/43",
    },
  ],
  title: "Dragon",
  episodeType: "standard",
  stillPath: "/fNcL3shgn8YsfsFiTsrcUjOKhHg.jpg",
  voteAverage: 7,
  createdAt: "2026-10-29T15:25:08.300Z",
  updatedAt: "2026-10-29T15:25:08.300Z",
} as const satisfies Episode
