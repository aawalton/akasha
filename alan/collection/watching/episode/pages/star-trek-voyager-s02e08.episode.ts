import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekVoyagerS02e08 = {
  id: "01a18853-ac8a-7c4f-880a-a053c7f748ae",
  type: "page-type/episode",
  slug: "star-trek-voyager-s02e08",
  description:
    "Stardate: Unknown. Captain Janeway starts seeing characters and objects from her holo-novel around the ship. Soon afterwards the crew begins entering a catatonic state one by one, while only Kes and the Doctor remain unaffected.",
  ownLength: 46,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-voyager-season-2"],
  position: 8,
  publishedAt: "1995-10-30",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "112974",
      externalLink: "https://www.themoviedb.org/tv/1855/season/2/episode/8",
    },
  ],
  title: "Persistence of Vision",
  episodeType: "standard",
  stillPath: "/hCXQBQW1hZKxNSB8TIX3qkq25z3.jpg",
  voteAverage: 6.8,
  createdAt: "2026-10-29T15:42:27.464Z",
  updatedAt: "2026-10-29T15:42:27.464Z",
} as const satisfies Episode
