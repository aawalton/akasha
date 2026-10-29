import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const torchwoodS02e12 = {
  id: "01a18859-3c6a-7457-abac-cee5f83e36a2",
  type: "page-type/episode",
  slug: "torchwood-s02e12",
  description:
    "As the team are knocked unconscious we find out how Jack, Toshiko, Ianto and Owen were initiated into Torchwood.",
  ownLength: 50,
  ownProgress: 0,
  partOfCollections: ["season/torchwood-season-2"],
  position: 12,
  publishedAt: "2008-03-21",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "21592",
      externalLink: "https://www.themoviedb.org/tv/424/season/2/episode/12",
    },
  ],
  title: "Fragments",
  episodeType: "standard",
  stillPath: "/uCz9PIHFUh5KqxYO4NnQHrCpeX7.jpg",
  voteAverage: 8.1,
  createdAt: "2026-10-29T15:48:31.976Z",
  updatedAt: "2026-10-29T15:48:31.976Z",
} as const satisfies Episode
