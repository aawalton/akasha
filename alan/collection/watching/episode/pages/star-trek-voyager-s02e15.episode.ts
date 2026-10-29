import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekVoyagerS02e15 = {
  id: "01a18853-ac8b-7bb1-999d-e9e1520f3062",
  type: "page-type/episode",
  slug: "star-trek-voyager-s02e15",
  description:
    "Stardate: Unknown. After finding a type of dilithium that can survive at a higher temperatures, Tom Paris comes up with the ingenious idea of attempting to cross the transwarp threshold in an attempt to find a way to get home faster.",
  ownLength: 46,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-voyager-season-2"],
  position: 15,
  publishedAt: "1996-01-29",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1005911",
      externalLink: "https://www.themoviedb.org/tv/1855/season/2/episode/15",
    },
  ],
  title: "Threshold",
  episodeType: "standard",
  stillPath: "/1ZFu70JfA123dX6gje2lKfjcM7j.jpg",
  voteAverage: 5.8,
  createdAt: "2026-10-29T15:42:27.464Z",
  updatedAt: "2026-10-29T15:42:27.464Z",
} as const satisfies Episode
