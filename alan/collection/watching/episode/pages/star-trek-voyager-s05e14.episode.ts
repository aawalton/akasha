import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekVoyagerS05e14 = {
  id: "01a18853-ac8f-7d27-be8f-c20d2acb820a",
  type: "page-type/episode",
  slug: "star-trek-voyager-s05e14",
  description:
    "Stardate: Unknown. The Voyager crew is lured into a giant space creature that consumes starships as food, and only Seven and the Doctor may have the ability to save the ship.",
  ownLength: 46,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-voyager-season-5"],
  position: 14,
  publishedAt: "1999-02-10",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "113223",
      externalLink: "https://www.themoviedb.org/tv/1855/season/5/episode/14",
    },
  ],
  title: "Bliss",
  episodeType: "standard",
  stillPath: "/3UY1pVhxW0I99dwcEJFzzs9f2dK.jpg",
  voteAverage: 7.2,
  createdAt: "2026-10-29T15:42:27.464Z",
  updatedAt: "2026-10-29T15:42:27.464Z",
} as const satisfies Episode
