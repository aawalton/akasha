import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theExpanseS01e01 = {
  id: "01a18857-1f7a-7a67-827b-732fe76933c6",
  type: "page-type/episode",
  slug: "the-expanse-s01e01",
  description:
    "In the outer solar system near Saturn, James Holden and the crew of the ice-freighter Canterbury, investigate a distress call from a mysterious derelict ship, the Scopuli. On Ceres Station, Detective Miller begins an off the book investigation of a missing heiress, Julie Mao.",
  ownLength: 48,
  ownProgress: 0,
  partOfCollections: ["season/the-expanse-season-1"],
  position: 1,
  publishedAt: "2015-12-14",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1098634",
      externalLink: "https://www.themoviedb.org/tv/63639/season/1/episode/1",
    },
  ],
  title: "Dulcinea",
  episodeType: "standard",
  stillPath: "/j4WEC9Jh4AyXF8ynpX3pz633tse.jpg",
  voteAverage: 7.7,
  createdAt: "2026-10-29T15:46:13.498Z",
  updatedAt: "2026-10-29T15:46:13.498Z",
} as const satisfies Episode
