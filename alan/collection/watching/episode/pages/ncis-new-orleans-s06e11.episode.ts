import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisNewOrleansS06e11 = {
  id: "01a1884b-301d-76a3-b491-fc855281bcbe",
  type: "page-type/episode",
  slug: "ncis-new-orleans-s06e11",
  description:
    "The team is concerned when Sebastian becomes unreachable while undercover as a new recruit.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/ncis-new-orleans-season-6"],
  position: 11,
  publishedAt: "2020-02-16",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2028055",
      externalLink: "https://www.themoviedb.org/tv/61387/season/6/episode/11",
    },
  ],
  title: "Bad Moon Rising",
  episodeType: "standard",
  stillPath: "/23TgZev712QXzPW15zWeMGWVQTB.jpg",
  voteAverage: 8.5,
  createdAt: "2026-10-29T15:33:11.316Z",
  updatedAt: "2026-10-29T15:33:11.316Z",
} as const satisfies Episode
