import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const steinsGateS01e05 = {
  id: "01a183d4-f6a6-7885-bf19-f18dee7f48ba",
  type: "page-type/episode",
  slug: "steins-gate-s01e05",
  description: "A successful hack reveals SERN's big secret.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/steins-gate-season-1"],
  position: 5,
  publishedAt: "2011-05-04",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "880888",
      externalLink: "https://www.themoviedb.org/tv/42509/season/1/episode/5",
    },
  ],
  title: "Starmine Rendezvous",
  episodeType: "standard",
  stillPath: "/92SFTY8Z4jj7AykgKlF5v4EMBxj.jpg",
  voteAverage: 7,
  createdAt: "2026-10-28T18:45:34.502Z",
  updatedAt: "2026-10-28T18:45:34.502Z",
} as const satisfies Episode
