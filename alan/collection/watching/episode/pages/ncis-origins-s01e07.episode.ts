import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisOriginsS01e07 = {
  id: "01a1884b-5349-738f-a07b-c7aa81466bce",
  type: "page-type/episode",
  slug: "ncis-origins-s01e07",
  description:
    "NIS investigates the murder of a dementia-afflicted Jane Doe. Also, flashbacks reveal the first time Gibbs met Franks",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-origins-season-1"],
  position: 7,
  publishedAt: "2024-11-25",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "5742363",
      externalLink: "https://www.themoviedb.org/tv/243006/season/1/episode/7",
    },
  ],
  title: "One Flew Over",
  episodeType: "standard",
  stillPath: "/jo7CbZAw6YYqrYfk3DfFDu68P4W.jpg",
  voteAverage: 7.6,
  createdAt: "2026-10-29T15:33:20.328Z",
  updatedAt: "2026-10-29T15:33:20.328Z",
} as const satisfies Episode
