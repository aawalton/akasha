import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const torchwoodS02e04 = {
  id: "01a18859-3c69-75db-a2aa-48d71de03958",
  type: "page-type/episode",
  slug: "torchwood-s02e04",
  description:
    "When Rhys discovers the truth about Torchwood, he helps the gang to find the source of an unusual alien meat supply.",
  ownLength: 50,
  ownProgress: 0,
  partOfCollections: ["season/torchwood-season-2"],
  position: 4,
  publishedAt: "2008-02-06",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "21582",
      externalLink: "https://www.themoviedb.org/tv/424/season/2/episode/4",
    },
  ],
  title: "Meat",
  episodeType: "standard",
  stillPath: "/kwf8h2kAWhGIxAmEuLi7e3kAnX9.jpg",
  voteAverage: 7.4,
  createdAt: "2026-10-29T15:48:31.976Z",
  updatedAt: "2026-10-29T15:48:31.976Z",
} as const satisfies Episode
