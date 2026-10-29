import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisNewOrleansS01e16 = {
  id: "01a1884b-3015-7add-a574-6c9a2fcd8756",
  type: "page-type/episode",
  slug: "ncis-new-orleans-s01e16",
  description:
    "The NCIS team tries to narrow down the motive when a Navy recruiter is murdered in a hit-and-run. Lasalle worries about his brother.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/ncis-new-orleans-season-1"],
  position: 16,
  publishedAt: "2015-02-24",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1044014",
      externalLink: "https://www.themoviedb.org/tv/61387/season/1/episode/16",
    },
  ],
  title: "My Brother's Keeper",
  episodeType: "standard",
  stillPath: "/81GBz5VqItYFn6pmNiOAQnoWsFk.jpg",
  voteAverage: 6,
  createdAt: "2026-10-29T15:33:11.316Z",
  updatedAt: "2026-10-29T15:33:11.316Z",
} as const satisfies Episode
