import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS04e08 = {
  id: "01a1884b-ef66-7e73-98a9-68cf485d0277",
  type: "page-type/episode",
  slug: "ncis-s04e08",
  description:
    "When an honored Marine veteran is found dead in a hotel, the NCIS team must find out what happened to him. Soon they realize that the Marine didn't commit suicide and that he was a homeless man.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-4"],
  position: 8,
  publishedAt: "2006-11-14",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334479",
      externalLink: "https://www.themoviedb.org/tv/4614/season/4/episode/8",
    },
  ],
  title: "Once a Hero",
  episodeType: "standard",
  stillPath: "/qWo2kGcy8DMFffacYyMdGOyuR3t.jpg",
  voteAverage: 7.4,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
