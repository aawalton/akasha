import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS15e19 = {
  id: "01a1884b-ef77-7311-bc63-cfaa8b34142a",
  type: "page-type/episode",
  slug: "ncis-s15e19",
  description:
    "Gibbs is granted protective custody of a ten-year-old orphaned refugee, Elena, when an NCIS case reveals she is the target of a violent gang.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-15"],
  position: 19,
  publishedAt: "2018-04-03",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1454431",
      externalLink: "https://www.themoviedb.org/tv/4614/season/15/episode/19",
    },
  ],
  title: "The Numerical Limit",
  episodeType: "standard",
  stillPath: "/8whkVGxLQsjY8ky5OqtHPPauSUi.jpg",
  voteAverage: 8.1,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
