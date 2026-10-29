import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisNewOrleansS03e04 = {
  id: "01a1884b-3018-7325-97d7-28fefcb68f96",
  type: "page-type/episode",
  slug: "ncis-new-orleans-s03e04",
  description:
    "The NCIS team must rescue one of their own after Sebastian is kidnapped while at a restaurant with his mother, Sylvia Lund, and forced to use his gaming skills in a prison break.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/ncis-new-orleans-season-3"],
  position: 4,
  publishedAt: "2016-10-18",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1232680",
      externalLink: "https://www.themoviedb.org/tv/61387/season/3/episode/4",
    },
  ],
  title: "Escape Plan",
  episodeType: "standard",
  stillPath: "/a7haJAFjOLvQlKNiknZNHA2UmHQ.jpg",
  voteAverage: 6.8,
  createdAt: "2026-10-29T15:33:11.316Z",
  updatedAt: "2026-10-29T15:33:11.316Z",
} as const satisfies Episode
