import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisNewOrleansS01e11 = {
  id: "01a1884b-3015-742d-9449-45ab35257629",
  type: "page-type/episode",
  slug: "ncis-new-orleans-s01e11",
  description:
    "The NCIS team investigates a deadly explosion at the Navy-Marine Corps Relief Gala, and discover Pride was the intended target of the bomb.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/ncis-new-orleans-season-1"],
  position: 11,
  publishedAt: "2015-01-06",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1025838",
      externalLink: "https://www.themoviedb.org/tv/61387/season/1/episode/11",
    },
  ],
  title: "Baitfish",
  episodeType: "standard",
  stillPath: "/ioEclJ1HpLommVN3Jz3skqWfZQp.jpg",
  voteAverage: 4.4,
  createdAt: "2026-10-29T15:33:11.316Z",
  updatedAt: "2026-10-29T15:33:11.316Z",
} as const satisfies Episode
