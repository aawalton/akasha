import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const goodWitchS03e08 = {
  id: "01a18849-3528-753c-8f17-9906e34e93cd",
  type: "page-type/episode",
  slug: "good-witch-s03e08",
  description:
    "Cassie decides to plan a surprise party for Sam to celebrate the anniversary of his move to Middleton.",
  ownLength: 42,
  ownProgress: 0,
  partOfCollections: ["season/good-witch-season-3"],
  position: 8,
  publishedAt: "2017-06-18",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1313155",
      externalLink: "https://www.themoviedb.org/tv/61864/season/3/episode/8",
    },
  ],
  title: "Somewhat Surprising",
  episodeType: "standard",
  stillPath: "/o5BMagtpivbhyBLTenZ0Qjj823i.jpg",
  voteAverage: 5,
  createdAt: "2026-10-29T15:31:01.543Z",
  updatedAt: "2026-10-29T15:31:01.543Z",
} as const satisfies Episode
