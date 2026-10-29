import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const torchwoodS02e05 = {
  id: "01a18859-3c69-7397-be19-848da5759eea",
  type: "page-type/episode",
  slug: "torchwood-s02e05",
  description:
    "A memory thief gets in to the minds of the Torchwood team, and uncovers long forgotten secrets.",
  ownLength: 50,
  ownProgress: 0,
  partOfCollections: ["season/torchwood-season-2"],
  position: 5,
  publishedAt: "2008-02-13",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "21581",
      externalLink: "https://www.themoviedb.org/tv/424/season/2/episode/5",
    },
  ],
  title: "Adam",
  episodeType: "standard",
  stillPath: "/aKweHOIR7ICYnUKJCdRKx8jVKml.jpg",
  voteAverage: 7.7,
  createdAt: "2026-10-29T15:48:31.976Z",
  updatedAt: "2026-10-29T15:48:31.976Z",
} as const satisfies Episode
