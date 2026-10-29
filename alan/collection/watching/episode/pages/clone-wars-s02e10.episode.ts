import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const cloneWarsS02e10 = {
  id: "01a18844-610c-704f-94c5-7fc56b400335",
  type: "page-type/episode",
  slug: "clone-wars-s02e10",
  description:
    "General Grievous is shot down over Saleucami and crash lands in the wilderness. Obi-Wan leads an expedition to find the droid general. Rex is injured during the search, and must recover in a local farmer's barn, but he is shocked to discover the farmer is a clone deserter.",
  ownLength: 22,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-clone-wars-season-2"],
  position: 10,
  publishedAt: "2010-01-01",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "286598",
      externalLink: "https://www.themoviedb.org/tv/4194/season/2/episode/10",
    },
  ],
  title: "The Deserter",
  episodeType: "standard",
  stillPath: "/qKcuqfjD7ohsLA6Cub8ZVfSC2xc.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T15:25:45.098Z",
  updatedAt: "2026-10-29T15:25:45.098Z",
} as const satisfies Episode
