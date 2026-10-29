import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const blueyS02e13 = {
  id: "01a18843-d150-7273-8468-561b5055470c",
  type: "page-type/episode",
  slug: "bluey-s02e13",
  description:
    "When Dad shows the kids how to use their old baby-harness, a new game is born: Dad Baby! But Dad is unprepared for the harsh realities of giving birth to a baby Bingo.",
  ownLength: 7,
  ownProgress: 0,
  partOfCollections: ["season/bluey-season-2"],
  position: 13,
  publishedAt: "2020-03-29",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2204631",
      externalLink: "https://www.themoviedb.org/tv/82728/season/2/episode/13",
    },
  ],
  title: "Dad Baby",
  episodeType: "standard",
  stillPath: "/7f3UCRo8eLxVmsPQMw6vTTkGgSx.jpg",
  voteAverage: 4,
  createdAt: "2026-10-29T15:25:08.300Z",
  updatedAt: "2026-10-29T15:25:08.300Z",
} as const satisfies Episode
