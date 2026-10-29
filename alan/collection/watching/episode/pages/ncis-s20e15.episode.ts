import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS20e15 = {
  id: "01a1884b-ef82-76c8-ad8c-fffd07c05d7b",
  type: "page-type/episode",
  slug: "ncis-s20e15",
  description:
    "NCIS investigates the death of a ride-share driver who was found after a car accident.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-20"],
  position: 15,
  publishedAt: "2023-02-27",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4242230",
      externalLink: "https://www.themoviedb.org/tv/4614/season/20/episode/15",
    },
  ],
  title: "Unusual Suspects",
  episodeType: "standard",
  stillPath: "/wn2XZFwKfTIU0iMl3wl4HTCQymC.jpg",
  voteAverage: 8.1,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
