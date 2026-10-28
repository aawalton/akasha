import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const kOnS02e02 = {
  id: "01a183da-4479-73ed-a784-5d7b5461e671",
  type: "page-type/episode",
  slug: "k-on-s02e02",
  description:
    "The girls find an old guitar that ends up being worth a lot of money. The girls purchase a selfless gift for their friend.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/k-on-season-2"],
  position: 2,
  publishedAt: "2010-04-14",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "879099",
      externalLink: "https://www.themoviedb.org/tv/42253/season/2/episode/2",
    },
  ],
  title: "Clean-up!",
  episodeType: "standard",
  stillPath: "/xnaLR4q0ie09DfbqasVrYxsok9e.jpg",
  voteAverage: 8.2,
  createdAt: "2026-10-28T18:51:22.104Z",
  updatedAt: "2026-10-28T18:51:22.104Z",
} as const satisfies Episode
