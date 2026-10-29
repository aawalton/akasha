import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekVoyagerS06e07 = {
  id: "01a18853-ac90-7579-b78a-9c14a73fe2a6",
  type: "page-type/episode",
  slug: "star-trek-voyager-s06e07",
  description:
    "Stardate: Unknown. The ship is placed in danger when it comes under attack from a territorial race of aliens known as the Turei. While sheltering on a planet, Captain Janeway tries to make an alliance with its inhabitants, the Vaadwaur. However, she soon begins to think that the Vaadwaur may pose a bigger threat than the enemy above.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-voyager-season-6"],
  position: 7,
  publishedAt: "1999-11-10",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "113303",
      externalLink: "https://www.themoviedb.org/tv/1855/season/6/episode/7",
    },
  ],
  title: "Dragon's Teeth",
  episodeType: "standard",
  stillPath: "/9rR2Ve8YZt5iE2lV1ROWkP7Unh1.jpg",
  voteAverage: 7.2,
  createdAt: "2026-10-29T15:42:27.464Z",
  updatedAt: "2026-10-29T15:42:27.464Z",
} as const satisfies Episode
