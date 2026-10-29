import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekVoyagerS02e01 = {
  id: "01a18853-ac8a-74ee-b9c3-fd0e5f74482c",
  type: "page-type/episode",
  slug: "star-trek-voyager-s02e01",
  description:
    "Stardate: 48975.1. The crew happen upon a 1936 Ford truck adrift in space, leading to the discovery of a cryogenic chamber of humans abducted in the 1930s, including Amelia Earhart.",
  ownLength: 46,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-voyager-season-2"],
  position: 1,
  publishedAt: "1995-08-28",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "112959",
      externalLink: "https://www.themoviedb.org/tv/1855/season/2/episode/1",
    },
  ],
  title: "The 37's",
  episodeType: "standard",
  stillPath: "/fPRiZZQQ8WrXe7iVrZUkMcPiALf.jpg",
  voteAverage: 7.5,
  createdAt: "2026-10-29T15:42:27.464Z",
  updatedAt: "2026-10-29T15:42:27.464Z",
} as const satisfies Episode
