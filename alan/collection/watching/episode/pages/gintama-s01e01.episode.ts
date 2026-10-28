import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const gintamaS01e01 = {
  id: "01a183d6-325e-7472-ba55-3d93e9c2e22f",
  type: "page-type/episode",
  slug: "gintama-s01e01",
  description:
    "Gintoki, Shinpachi, and Kagura receive a request from a man who wants them to make him stronger.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/gintama-season-1"],
  position: 1,
  publishedAt: "2006-04-04",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "940325",
      externalLink: "https://www.themoviedb.org/tv/57041/season/1/episode/1",
    },
  ],
  title: "You Guys!! Do You Even Have a Gintama?! (1)",
  episodeType: "standard",
  stillPath: "/y5pEdY5ywTf0wgYw3S2ddRVgxoW.jpg",
  voteAverage: 7,
  createdAt: "2026-10-28T18:46:55.326Z",
  updatedAt: "2026-10-28T18:46:55.326Z",
} as const satisfies Episode
