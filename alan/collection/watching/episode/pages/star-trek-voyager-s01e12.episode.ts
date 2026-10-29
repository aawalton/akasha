import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekVoyagerS01e12 = {
  id: "01a18853-ac8a-7411-99db-2d34e797f7c4",
  type: "page-type/episode",
  slug: "star-trek-voyager-s01e12",
  description:
    "Stardate: 48734.2. After Chakotay and Tuvok are injured in a shuttle accident, a non-corporeal life form begins to wreak havoc on Voyager by infiltrating the minds of the crew and altering the ship's systems one by one.",
  ownLength: 46,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-voyager-season-1"],
  position: 12,
  publishedAt: "1995-05-01",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "112949",
      externalLink: "https://www.themoviedb.org/tv/1855/season/1/episode/12",
    },
  ],
  title: "Cathexis",
  episodeType: "standard",
  stillPath: "/dPDHy8t0oAbbJT7VOmKo03pqBgU.jpg",
  voteAverage: 6.5,
  createdAt: "2026-10-29T15:42:27.464Z",
  updatedAt: "2026-10-29T15:42:27.464Z",
} as const satisfies Episode
