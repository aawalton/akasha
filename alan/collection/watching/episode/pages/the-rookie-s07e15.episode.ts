import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theRookieS07e15 = {
  id: "01a18858-036f-76fb-bdd0-640ca9c1fa4f",
  type: "page-type/episode",
  slug: "the-rookie-s07e15",
  description:
    "Documentary filmmakers interview the LAPD on a complicated missing person's case connected to John.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/the-rookie-season-7"],
  position: 15,
  publishedAt: "2025-04-22",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "6112104",
      externalLink: "https://www.themoviedb.org/tv/79744/season/7/episode/15",
    },
  ],
  title: "A Deadly Secret",
  episodeType: "standard",
  stillPath: "/AvjkEq9EeLiiKtKp7nwloESQlGO.jpg",
  voteAverage: 6.7,
  createdAt: "2026-10-29T15:47:11.854Z",
  updatedAt: "2026-10-29T15:47:11.854Z",
} as const satisfies Episode
