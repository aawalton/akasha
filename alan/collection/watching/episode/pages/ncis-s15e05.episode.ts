import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS15e05 = {
  id: "01a1884b-ef76-7fe6-ace5-c2a7a8342553",
  type: "page-type/episode",
  slug: "ncis-s15e05",
  description:
    "Reeves sees his friend get kidnapped and the investigation reveals the primary suspect disappeared two days earlier with confidential military information.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-15"],
  position: 5,
  publishedAt: "2017-10-24",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1377553",
      externalLink: "https://www.themoviedb.org/tv/4614/season/15/episode/5",
    },
  ],
  title: "Fake It ‘Till You Make It",
  episodeType: "standard",
  stillPath: "/1lZzAOj1vomEhMlbHoNoNopZZfh.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
