import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const downtonAbbeyS02e01 = {
  id: "01a18847-e985-7c35-853e-dbe034992861",
  type: "page-type/episode",
  slug: "downton-abbey-s02e01",
  description:
    "The Great War unsettles life at Downton and surprising news about Matthew rocks the family. New maid Ethel irritates O'Brien - and Bates returns with devastating news for Anna.",
  ownLength: 69,
  ownProgress: 0,
  partOfCollections: ["season/downton-abbey-season-2"],
  position: 1,
  publishedAt: "2011-09-18",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "779842",
      externalLink: "https://www.themoviedb.org/tv/33907/season/2/episode/1",
    },
  ],
  title: "Episode 1",
  episodeType: "standard",
  stillPath: "/icwSCPTYWRshCdN6OOOyrJYDazW.jpg",
  voteAverage: 7.7,
  createdAt: "2026-10-29T15:29:36.644Z",
  updatedAt: "2026-10-29T15:29:36.644Z",
} as const satisfies Episode
