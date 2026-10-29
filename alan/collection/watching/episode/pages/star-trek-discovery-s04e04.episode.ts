import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekDiscoveryS04e04 = {
  id: "01a18852-a9f7-76ef-a91b-4c60b25eda12",
  type: "page-type/episode",
  slug: "star-trek-discovery-s04e04",
  description:
    "Tilly and Adira lead a team of Starfleet Academy cadets on a training mission that takes a dangerous turn. Meanwhile, Burnham is pulled into tense negotiations on Ni’Var.",
  ownLength: 54,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-discovery-season-4"],
  position: 4,
  publishedAt: "2021-12-09",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "3345785",
      externalLink: "https://www.themoviedb.org/tv/67198/season/4/episode/4",
    },
  ],
  title: "All Is Possible",
  episodeType: "standard",
  stillPath: "/ahkPNBqicfkfvhhAaopPSl6NrPI.jpg",
  voteAverage: 4.5,
  createdAt: "2026-10-29T15:41:21.268Z",
  updatedAt: "2026-10-29T15:41:21.268Z",
} as const satisfies Episode
