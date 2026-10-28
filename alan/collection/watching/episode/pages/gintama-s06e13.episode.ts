import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const gintamaS06e13 = {
  id: "01a183d6-3271-7224-b8bd-825ab54bd877",
  type: "page-type/episode",
  slug: "gintama-s06e13",
  description:
    "Sadaharu, fed up with the lack of food at Odd Jobs, decides to leave to fend for himself. On the way he meets a starving puppy that he can't ignore.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/gintama-season-6"],
  position: 13,
  publishedAt: "2013-03-28",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "940549",
      externalLink: "https://www.themoviedb.org/tv/57041/season/6/episode/13",
    },
  ],
  title: "Dog Food Doesn't Taste Like You Think",
  episodeType: "finale",
  stillPath: "/mzxY8br0fLrSK5704KjCa474SVy.jpg",
  voteAverage: 8.5,
  createdAt: "2026-10-28T18:46:55.326Z",
  updatedAt: "2026-10-28T18:46:55.326Z",
} as const satisfies Episode
