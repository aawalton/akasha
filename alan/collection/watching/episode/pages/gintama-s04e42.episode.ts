import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const gintamaS04e42 = {
  id: "01a183d6-326b-7645-947a-8209479fae1d",
  type: "page-type/episode",
  slug: "gintama-s04e42",
  description:
    "While protecting Gintoki from the stray cats, Hoichi and the cats get caught. Soon Gintoki, Katsura and Kondo goes to save him.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/gintama-season-4"],
  position: 42,
  publishedAt: "2010-01-21",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "940466",
      externalLink: "https://www.themoviedb.org/tv/57041/season/4/episode/42",
    },
  ],
  title: "Kabukicho Stray Cat Blues",
  episodeType: "standard",
  stillPath: "/2R168kcob43xESo1t53aKpf5G5a.jpg",
  voteAverage: 9,
  createdAt: "2026-10-28T18:46:55.326Z",
  updatedAt: "2026-10-28T18:46:55.326Z",
} as const satisfies Episode
