import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS04e22 = {
  id: "01a1884b-ef67-7a0a-8547-bdfc6537d689",
  type: "page-type/episode",
  slug: "ncis-s04e22",
  description:
    "When a blind photographer shoots the body of a Petty Officer on film, the NCIS team use his special insight to investigate the crime.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-4"],
  position: 22,
  publishedAt: "2007-05-01",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334493",
      externalLink: "https://www.themoviedb.org/tv/4614/season/4/episode/22",
    },
  ],
  title: "In the Dark",
  episodeType: "standard",
  stillPath: "/d6YDw39PNMjfe5XmFRNvECP2QOZ.jpg",
  voteAverage: 6.7,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
