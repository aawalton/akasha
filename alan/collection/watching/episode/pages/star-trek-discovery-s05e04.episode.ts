import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekDiscoveryS05e04 = {
  id: "01a18852-a9f8-75f7-a628-6239686e4906",
  type: "page-type/episode",
  slug: "star-trek-discovery-s05e04",
  description:
    "On the way to the next clue, the U.S.S. Discovery is sabotaged by a mysterious weapon, leaving Captain Burnham, Rayner, and Stamets as the only crew members who can possibly save the ship in time.",
  ownLength: 52,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-discovery-season-5"],
  position: 4,
  publishedAt: "2024-04-18",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "5054501",
      externalLink: "https://www.themoviedb.org/tv/67198/season/5/episode/4",
    },
  ],
  title: "Face the Strange",
  episodeType: "standard",
  stillPath: "/pENjqE8fsJ9bRBDSnEfg6grOWRx.jpg",
  voteAverage: 5.1,
  createdAt: "2026-10-29T15:41:21.268Z",
  updatedAt: "2026-10-29T15:41:21.268Z",
} as const satisfies Episode
