import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const stevenUniverseS01e10 = {
  id: "01a18855-67e4-709d-b6e3-ef56d884d1ed",
  type: "page-type/episode",
  slug: "steven-universe-s01e10",
  description:
    "Steven befriends a magical lion he finds in the desert during a mission with the Gems.",
  ownLength: 12,
  ownProgress: 0,
  partOfCollections: ["season/steven-universe-season-1"],
  position: 10,
  publishedAt: "2014-01-27",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1003603",
      externalLink: "https://www.themoviedb.org/tv/61175/season/1/episode/10",
    },
  ],
  title: "Steven's Lion",
  episodeType: "standard",
  stillPath: "/4azeSV4lJyMeH2k8KMgnzrC8CsT.jpg",
  voteAverage: 6.6,
  createdAt: "2026-10-29T15:44:20.963Z",
  updatedAt: "2026-10-29T15:44:20.963Z",
} as const satisfies Episode
