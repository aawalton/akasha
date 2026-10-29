import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const blueyS02e22 = {
  id: "01a18843-d151-7d87-ba86-6908720f62cd",
  type: "page-type/episode",
  slug: "bluey-s02e22",
  description:
    "During a game of bus, passenger Mum is too scared to tell Bus Driver Dad that she secretly loves him, until she gets some help from the Grannies.",
  ownLength: 7,
  ownProgress: 0,
  partOfCollections: ["season/bluey-season-2"],
  position: 22,
  publishedAt: "2020-04-07",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2218572",
      externalLink: "https://www.themoviedb.org/tv/82728/season/2/episode/22",
    },
  ],
  title: "Bus",
  episodeType: "standard",
  stillPath: "/3HffG0X3GUg9QVJdn9Xiy22yRjn.jpg",
  voteAverage: 6.7,
  createdAt: "2026-10-29T15:25:08.300Z",
  updatedAt: "2026-10-29T15:25:08.300Z",
} as const satisfies Episode
