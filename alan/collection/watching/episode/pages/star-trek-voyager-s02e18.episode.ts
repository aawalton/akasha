import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekVoyagerS02e18 = {
  id: "01a18853-ac8b-7316-b715-5e1e9739a71d",
  type: "page-type/episode",
  slug: "star-trek-voyager-s02e18",
  description:
    "Stardate: 49301.2. A suicidal Q threatens the future of the Q-Continuum after he requests asylum aboard Voyager.",
  ownLength: 46,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-voyager-season-2"],
  position: 18,
  publishedAt: "1996-02-19",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "113022",
      externalLink: "https://www.themoviedb.org/tv/1855/season/2/episode/18",
    },
  ],
  title: "Death Wish",
  episodeType: "standard",
  stillPath: "/yFn75jNlMTcVTILzvh06eNmiotI.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-29T15:42:27.464Z",
  updatedAt: "2026-10-29T15:42:27.464Z",
} as const satisfies Episode
