import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS02e20 = {
  id: "01a1884b-ef64-70f6-b6b2-084bac875956",
  type: "page-type/episode",
  slug: "ncis-s02e20",
  description:
    'After a Marine is murdered in a school campus the team discover a possible suspect for his murder, but they soon find the suspect murdered. Tim and Abby discover a trace to a "Red Cell" in the e-mails and the team believe that maybe the Marine was involved in a serious game.',
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-2"],
  position: 20,
  publishedAt: "2005-04-26",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334515",
      externalLink: "https://www.themoviedb.org/tv/4614/season/2/episode/20",
    },
  ],
  title: "Red Cell",
  episodeType: "standard",
  stillPath: "/7Zliz7GH1nRyHlZCUrHP9fBHPvo.jpg",
  voteAverage: 7.1,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
