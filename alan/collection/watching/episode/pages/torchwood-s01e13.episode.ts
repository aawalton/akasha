import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const torchwoodS01e13 = {
  id: "01a18859-3c69-72e7-929e-af467208c6c0",
  type: "page-type/episode",
  slug: "torchwood-s01e13",
  description:
    'With the Rift having been opened, people and objects throughout time are falling through it, and being spread across the world. "The thing in the darkness" has finally come, and Jack realises that he is the only one who can save planet Earth from the destruction that "the son of the Beast" will cause.',
  ownLength: 47,
  ownProgress: 0,
  partOfCollections: ["season/torchwood-season-1"],
  position: 13,
  publishedAt: "2007-01-01",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "21580",
      externalLink: "https://www.themoviedb.org/tv/424/season/1/episode/13",
    },
  ],
  title: "End of Days",
  episodeType: "finale",
  stillPath: "/3sgcaf4nqiSwY4oZUpKqy6v91fQ.jpg",
  voteAverage: 6.9,
  createdAt: "2026-10-29T15:48:31.976Z",
  updatedAt: "2026-10-29T15:48:31.976Z",
} as const satisfies Episode
