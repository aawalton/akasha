import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const kOnS02e01 = {
  id: "01a183da-4479-7390-a7cc-4641a2f6207b",
  type: "page-type/episode",
  slug: "k-on-s02e01",
  description:
    "Yui, Mio, Ritsu, and Tsumungi are all in the same class and members of the same music club. They want to bring in more members so their friend Azusa won't be the club's only member once they all graduate.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/k-on-season-2"],
  position: 1,
  publishedAt: "2010-04-07",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "879098",
      externalLink: "https://www.themoviedb.org/tv/42253/season/2/episode/1",
    },
  ],
  title: "Seniors!",
  episodeType: "standard",
  stillPath: "/sZJamTpk4Gub8ePBLCKAAF1lAEg.jpg",
  voteAverage: 8.4,
  createdAt: "2026-10-28T18:51:22.104Z",
  updatedAt: "2026-10-28T18:51:22.104Z",
} as const satisfies Episode
