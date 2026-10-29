import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const babylon5S03e03 = {
  id: "01a18843-5080-7a40-9e85-fbd2b48903c9",
  type: "page-type/episode",
  slug: "babylon-5-s03e03",
  description:
    "The new Centauri appointed Narn government send a replacement for G'Kar, while an alien probe threatens to destroy Babylon 5 unless it gets the answers for a series of complicated scientific questions.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/babylon-5-point-of-no-return"],
  position: 3,
  publishedAt: "1995-11-20",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "235956",
      externalLink: "https://www.themoviedb.org/tv/3137/season/3/episode/3",
    },
  ],
  title: "A Day in the Strife",
  episodeType: "standard",
  stillPath: "/odP6U2BluGewYBzjeRb5SNcje1b.jpg",
  voteAverage: 7.1,
  createdAt: "2026-10-29T15:24:35.325Z",
  updatedAt: "2026-10-29T15:24:35.325Z",
} as const satisfies Episode
