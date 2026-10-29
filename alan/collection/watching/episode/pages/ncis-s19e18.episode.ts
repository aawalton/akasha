import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS19e18 = {
  id: "01a1884b-ef80-7035-8c36-0ee7f1c8bd39",
  type: "page-type/episode",
  slug: "ncis-s19e18",
  description:
    "When an infamous arms dealer, Reymundo Diaz, is released from prison and bodies start piling up, Torres is forced to face the repercussions of his actions during an undercover operation he worked on years ago.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-19"],
  position: 18,
  publishedAt: "2022-04-18",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "3620105",
      externalLink: "https://www.themoviedb.org/tv/4614/season/19/episode/18",
    },
  ],
  title: "Last Dance",
  episodeType: "standard",
  stillPath: "/jwzQuFOpvtrEh4ujxOfaNCPR1x8.jpg",
  voteAverage: 8.6,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
