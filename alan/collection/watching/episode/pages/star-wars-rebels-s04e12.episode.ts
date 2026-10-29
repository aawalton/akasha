import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starWarsRebelsS04e12 = {
  id: "01a18853-ddff-7e7d-8e3b-9c5fdb5ea482",
  type: "page-type/episode",
  slug: "star-wars-rebels-s04e12",
  description:
    "Ezra leads the Ghost crew back to the Jedi temple on Lothal where they discover that the Empire has diabolical plans for the powerful secrets it holds.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-rebels-season-4"],
  position: 12,
  publishedAt: "2018-02-26",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1439924",
      externalLink: "https://www.themoviedb.org/tv/60554/season/4/episode/12",
    },
  ],
  title: "Wolves and a Door",
  episodeType: "standard",
  stillPath: "/nqjCzJCmKt6AVXJ4EOQ6qcIS3EE.jpg",
  voteAverage: 8.2,
  createdAt: "2026-10-29T15:42:40.123Z",
  updatedAt: "2026-10-29T15:42:40.123Z",
} as const satisfies Episode
