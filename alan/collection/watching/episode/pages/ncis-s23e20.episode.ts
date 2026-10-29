import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS23e20 = {
  id: "01a1884b-ef86-74e8-88ff-1ebd4dd2cc8c",
  type: "page-type/episode",
  slug: "ncis-s23e20",
  description:
    "One year after a deadly coffee shop bombing, a new explosion proves the attack wasn’t the work of a lone wolf – a case that forces the team to confront legacy and loyalty.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-23"],
  position: 20,
  publishedAt: "2026-05-12",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "7095299",
      externalLink: "https://www.themoviedb.org/tv/4614/season/23/episode/20",
    },
  ],
  title: "Sons and Daughters",
  episodeType: "finale",
  stillPath: "/om3Gus9exUBMbRGCFae42OBhF8N.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
