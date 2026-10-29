import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS15e24 = {
  id: "01a1884b-ef77-7ce6-8d79-227a4691ee72",
  type: "page-type/episode",
  slug: "ncis-s15e24",
  description:
    "Sloane is adamant that a man who held her hostage and tortured her years ago in Afghanistan, and was believed to have been killed following her rescue, is alive and in D.C.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-15"],
  position: 24,
  publishedAt: "2018-05-22",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1477735",
      externalLink: "https://www.themoviedb.org/tv/4614/season/15/episode/24",
    },
  ],
  title: "Date with Destiny",
  episodeType: "finale",
  stillPath: "/qvPY2q1LttmbuuVfHtio8h7G4d2.jpg",
  voteAverage: 8.2,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
