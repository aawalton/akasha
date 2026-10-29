import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const wandavisionS01e04 = {
  id: "01a18881-0937-7ec4-bf9b-13f6fc22992d",
  type: "page-type/episode",
  slug: "wandavision-s01e04",
  description:
    "Monica Rambeau, tasked with a special assignment regarding sentient weapons, goes missing.",
  ownLength: 37,
  ownProgress: 37,
  partOfCollections: ["season/wandavision-miniseries"],
  position: 4,
  publishedAt: "2021-01-29",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2639817",
      externalLink: "https://www.themoviedb.org/tv/85271/season/1/episode/4",
    },
  ],
  title: "We Interrupt This Program",
  episodeType: "standard",
  stillPath: "/n05kPjsO1LBRiTeGmJY6u68pfYO.jpg",
  voteAverage: 8.1,
  createdAt: "2026-10-29T16:32:00.311Z",
  updatedAt: "2026-10-29T16:32:00.311Z",
} as const satisfies Episode
