import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekVoyagerS07e06 = {
  id: "01a18853-ac92-71ee-919b-45e10c7c3b26",
  type: "page-type/episode",
  slug: "star-trek-voyager-s07e06",
  description:
    "Stardate: 54208.3 - The Voyager crew receives a transmission from the Alpha Quadrant that contains an interactive holographic program of Lieutenant Barclay, who informs them that Starfleet has found Voyager a way home.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-voyager-season-7"],
  position: 6,
  publishedAt: "2000-11-08",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4466826",
      externalLink: "https://www.themoviedb.org/tv/1855/season/7/episode/6",
    },
  ],
  title: "Inside Man",
  episodeType: "standard",
  stillPath: "/bgkIVunJsQtDSzcZWtufL26snSo.jpg",
  voteAverage: 7.3,
  createdAt: "2026-10-29T15:42:27.464Z",
  updatedAt: "2026-10-29T15:42:27.464Z",
} as const satisfies Episode
