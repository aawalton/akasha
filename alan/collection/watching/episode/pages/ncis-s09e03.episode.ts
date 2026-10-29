import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS09e03 = {
  id: "01a1884b-ef6e-7b93-aae8-8b316ac13d7d",
  type: "page-type/episode",
  slug: "ncis-s09e03",
  description:
    "The line between McGee's personal and professional life is blurred when NCIS uncovers a connection between his grandmother and the murder of a Navy Lieutenant.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-9"],
  position: 3,
  publishedAt: "2011-10-04",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334593",
      externalLink: "https://www.themoviedb.org/tv/4614/season/9/episode/3",
    },
  ],
  title: "The Penelope Papers",
  episodeType: "standard",
  stillPath: "/fphsmPgBsBRS2h5Hv3hMwywNoFq.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
