import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const blueyS01e15 = {
  id: "01a18843-d14d-74fa-ba69-2a8c6d15941d",
  type: "page-type/episode",
  slug: "bluey-s01e15",
  description:
    "Playing 'Butterflies' in the backyard is great fun, until Bluey runs away with Judo leaving Bingo all alone. Now poor Bingo's heartbroken and Bluey needs to make amends.",
  ownLength: 7,
  ownProgress: 0,
  partOfCollections: ["season/bluey-season-1"],
  position: 15,
  publishedAt: "2018-10-15",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1593940",
      externalLink: "https://www.themoviedb.org/tv/82728/season/1/episode/15",
    },
  ],
  title: "Butterflies",
  episodeType: "standard",
  stillPath: "/7pMrJZyiPOM4KbwXgd25yXEysVN.jpg",
  voteAverage: 8.7,
  createdAt: "2026-10-29T15:25:08.300Z",
  updatedAt: "2026-10-29T15:25:08.300Z",
} as const satisfies Episode
