import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS14e12 = {
  id: "01a1884b-ef75-7725-90a5-ffd06d41682c",
  type: "page-type/episode",
  slug: "ncis-s14e12",
  description:
    'When Gibbs spots the brother of an "NCIS Most Wanted" suspect, he takes the opportunity to assume his former alias and go undercover with their infamous anti-government militia.',
  ownLength: 41,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-14"],
  position: 12,
  publishedAt: "2017-01-17",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1251662",
      externalLink: "https://www.themoviedb.org/tv/4614/season/14/episode/12",
    },
  ],
  title: "Off the Grid",
  episodeType: "standard",
  stillPath: "/8aNhqb92Jhi8edichieJaiusluC.jpg",
  voteAverage: 7.1,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
