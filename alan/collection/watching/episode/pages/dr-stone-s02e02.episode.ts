import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const drStoneS02e02 = {
  id: "01a183d9-8fc0-7edc-94ff-6185baa0884c",
  type: "page-type/episode",
  slug: "dr-stone-s02e02",
  description:
    "While Senku's diversion buys Gen and others some time, soon Homura realizes something is not right.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/dr-stone-season-2"],
  position: 2,
  publishedAt: "2021-01-21",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2617652",
      externalLink: "https://www.themoviedb.org/tv/86031/season/2/episode/2",
    },
  ],
  title: "Hot Line",
  episodeType: "standard",
  stillPath: "/kyRkW4ICLl1AZwvWk5lo9IAJwQj.jpg",
  voteAverage: 7,
  createdAt: "2026-10-28T18:50:35.838Z",
  updatedAt: "2026-10-28T18:50:35.838Z",
} as const satisfies Episode
