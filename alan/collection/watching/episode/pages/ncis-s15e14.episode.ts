import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS15e14 = {
  id: "01a1884b-ef76-7079-8833-ac63b11390ea",
  type: "page-type/episode",
  slug: "ncis-s15e14",
  description:
    'After the body of a missing Navy commander is found, Vance orders Gibbs and the team to work with former FBI Agent Tobias "T.C." Fornell, the private investigator who was hired to locate him.',
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-15"],
  position: 14,
  publishedAt: "2018-02-06",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1422475",
      externalLink: "https://www.themoviedb.org/tv/4614/season/15/episode/14",
    },
  ],
  title: "Keep Your Friends Close",
  episodeType: "standard",
  stillPath: "/qzyCE0EMorZ2WmVtvCXGgRTrlOJ.jpg",
  voteAverage: 8.1,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
