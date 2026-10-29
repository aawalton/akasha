import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS15e23 = {
  id: "01a1884b-ef77-7c9e-8765-fb28e8ab612b",
  type: "page-type/episode",
  slug: "ncis-s15e23",
  description:
    "While Gibbs attends the memorial service for a friend who was lost at sea, he discovers that the deceased, Navy Captain Phillip Brooks, has been hiding in a fallout shelter after his boat was attacked and he swam to shore.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-15"],
  position: 23,
  publishedAt: "2018-05-15",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1474184",
      externalLink: "https://www.themoviedb.org/tv/4614/season/15/episode/23",
    },
  ],
  title: "Fallout",
  episodeType: "standard",
  stillPath: "/id1OXfnmUjifcgX1CFpynbSKSBs.jpg",
  voteAverage: 7.7,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
