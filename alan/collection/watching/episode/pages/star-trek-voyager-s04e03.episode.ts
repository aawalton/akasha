import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekVoyagerS04e03 = {
  id: "01a18853-ac8d-72a2-8a34-094e4844a64e",
  type: "page-type/episode",
  slug: "star-trek-voyager-s04e03",
  description:
    "Stardate: Unknown. When Voyager is forced to eject its warp core, Torres and Paris take a shuttle to retrieve it. But when the shuttle is damaged, the two officers are forced to abandon it—and find themselves alone in space with a rapidly depleting oxygen supply.",
  ownLength: 46,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-voyager-season-4"],
  position: 3,
  publishedAt: "1997-09-17",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "113160",
      externalLink: "https://www.themoviedb.org/tv/1855/season/4/episode/3",
    },
  ],
  title: "Day of Honor",
  episodeType: "standard",
  stillPath: "/pVyImCnhNHIz8vmIogYz1QcgAyB.jpg",
  voteAverage: 6.9,
  createdAt: "2026-10-29T15:42:27.464Z",
  updatedAt: "2026-10-29T15:42:27.464Z",
} as const satisfies Episode
