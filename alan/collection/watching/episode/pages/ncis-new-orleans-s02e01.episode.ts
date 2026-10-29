import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisNewOrleansS02e01 = {
  id: "01a1884b-3016-70bc-ab79-e6c0330f6552",
  type: "page-type/episode",
  slug: "ncis-new-orleans-s02e01",
  description:
    "A military convoy is attacked in order to steal a missile that is part of a Naval exercise. Pride and the team, believing that it is perpetrated by a group of anti-American militants, make plans for a dangerous undercover operation with potentially deadly consequences.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/ncis-new-orleans-season-2"],
  position: 1,
  publishedAt: "2015-09-22",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1109305",
      externalLink: "https://www.themoviedb.org/tv/61387/season/2/episode/1",
    },
  ],
  title: "Sic Semper Tyrannis",
  episodeType: "standard",
  stillPath: "/pJVUgSBqnK8DA8KcRCMICxH6kUv.jpg",
  voteAverage: 6.7,
  createdAt: "2026-10-29T15:33:11.316Z",
  updatedAt: "2026-10-29T15:33:11.316Z",
} as const satisfies Episode
