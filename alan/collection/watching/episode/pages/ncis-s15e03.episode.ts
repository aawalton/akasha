import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS15e03 = {
  id: "01a1884b-ef76-7e45-b68d-0d861077102a",
  type: "page-type/episode",
  slug: "ncis-s15e03",
  description:
    "Torres' partner mysteriously vanishes during a stakeout with Metro P.D. The investigation uncovers new evidence from a decade-old murder case.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-15"],
  position: 3,
  publishedAt: "2017-10-10",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1367785",
      externalLink: "https://www.themoviedb.org/tv/4614/season/15/episode/3",
    },
  ],
  title: "Exit Strategy",
  episodeType: "standard",
  stillPath: "/9jQipW2Rgg3xjkMe5X9UQa6JqPN.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
