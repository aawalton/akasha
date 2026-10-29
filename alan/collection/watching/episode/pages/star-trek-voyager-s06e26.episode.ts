import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekVoyagerS06e26 = {
  id: "01a18853-ac91-71d1-ab74-3585b9f54f06",
  type: "page-type/episode",
  slug: "star-trek-voyager-s06e26",
  description:
    "Stardate: Unknown. Seven of Nine is contacted by Borg drones who have the ability to exist in a virtual realm that gives them freedom as individuals.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-voyager-season-6"],
  position: 26,
  publishedAt: "2000-05-24",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "113362",
      externalLink: "https://www.themoviedb.org/tv/1855/season/6/episode/26",
    },
  ],
  title: "Unimatrix Zero (1)",
  episodeType: "finale",
  stillPath: "/1BGjNLEPFDxWHkj3qJ8tL5Yu3Dw.jpg",
  voteAverage: 7.6,
  createdAt: "2026-10-29T15:42:27.464Z",
  updatedAt: "2026-10-29T15:42:27.464Z",
} as const satisfies Episode
