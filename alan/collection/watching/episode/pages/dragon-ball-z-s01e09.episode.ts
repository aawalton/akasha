import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const dragonBallZS01e09 = {
  id: "01a183dc-5610-71f2-8846-1335dec64b4e",
  type: "page-type/episode",
  slug: "dragon-ball-z-s01e09",
  description:
    "To escape a pack of wild animals, Gohan ventures into an ancient cave, where he meets an old Capsule Corp robot. The robot has lived alone in the cave for over 30 years, and he’s not happy to have visitors!",
  ownLength: 25,
  ownProgress: 0,
  partOfCollections: ["season/dragon-ball-z-season-1"],
  position: 9,
  publishedAt: "1989-06-28",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "969589",
      externalLink: "https://www.themoviedb.org/tv/12971/season/1/episode/9",
    },
  ],
  title: "The Strangest Robot",
  episodeType: "standard",
  stillPath: "/kfFlkrUSBQmbinytEg55RLhkqbT.jpg",
  voteAverage: 7.7,
  createdAt: "2026-10-28T18:53:37.679Z",
  updatedAt: "2026-10-28T18:53:37.679Z",
} as const satisfies Episode
