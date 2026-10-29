import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theRookieS07e01 = {
  id: "01a18858-036e-733e-b025-d6fd54a43cfd",
  type: "page-type/episode",
  slug: "the-rookie-s07e01",
  description:
    "Now recovering from a gunshot wound and feeling the effects of his age, John and the team welcome two new rookies and continue the hunt for two dangerous inmates with very personal vendettas following their prison escape.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/the-rookie-season-7"],
  position: 1,
  publishedAt: "2025-01-07",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "5747648",
      externalLink: "https://www.themoviedb.org/tv/79744/season/7/episode/1",
    },
  ],
  title: "The Shot",
  episodeType: "standard",
  stillPath: "/t3KkvFkgwVP20qzlSj1p47nu0Jl.jpg",
  voteAverage: 9,
  createdAt: "2026-10-29T15:47:11.854Z",
  updatedAt: "2026-10-29T15:47:11.854Z",
} as const satisfies Episode
