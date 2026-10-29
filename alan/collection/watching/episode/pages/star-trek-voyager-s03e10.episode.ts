import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekVoyagerS03e10 = {
  id: "01a18853-ac8c-7720-9352-3774fa426e48",
  type: "page-type/episode",
  slug: "star-trek-voyager-s03e10",
  description:
    "Stardate: 50348.1. A dying warlord transfers his consciousness to Kes’s body and uses her to stage a bloody coup on his home world.",
  ownLength: 46,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-voyager-season-3"],
  position: 10,
  publishedAt: "1996-11-20",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "113111",
      externalLink: "https://www.themoviedb.org/tv/1855/season/3/episode/10",
    },
  ],
  title: "Warlord",
  episodeType: "standard",
  stillPath: "/tqz4YRX52xGARb9O0gENXb85dWk.jpg",
  voteAverage: 6.2,
  createdAt: "2026-10-29T15:42:27.464Z",
  updatedAt: "2026-10-29T15:42:27.464Z",
} as const satisfies Episode
