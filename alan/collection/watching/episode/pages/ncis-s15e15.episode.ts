import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS15e15 = {
  id: "01a1884b-ef77-766e-9130-287005ff1167",
  type: "page-type/episode",
  slug: "ncis-s15e15",
  description:
    "NCIS strikes a deal with convicted murderer Paul Triff, giving him a 48-hour furlough at his former residence, now McGee's home, in exchange for information that can convict his former cellmate, Gabriel Hicks, the murderer who deceived Gibbs and Fornell.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-15"],
  position: 15,
  publishedAt: "2018-02-27",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1428877",
      externalLink: "https://www.themoviedb.org/tv/4614/season/15/episode/15",
    },
  ],
  title: "Keep Your Enemies Closer",
  episodeType: "standard",
  stillPath: "/wSe8pVZjiq3cVxQs7fX5GUDov0S.jpg",
  voteAverage: 8.1,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
