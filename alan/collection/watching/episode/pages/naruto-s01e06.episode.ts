import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const narutoS01e06 = {
  id: "01a183d1-bb4a-7d04-a183-b84963e2fc1e",
  type: "page-type/episode",
  slug: "naruto-s01e06",
  description:
    "Tired of doing lame missions, Naruto asks the Hokage to give them something challenging. The Hokage caves and gives them a C-rank mission. They will be bodyguards for a bridge builder. It appears to be a simple mission, until the group is attacked by something more than common thugs...other ninja!",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/naruto-season-1"],
  position: 6,
  publishedAt: "2002-11-07",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1059126",
      externalLink: "https://www.themoviedb.org/tv/46260/season/1/episode/6",
    },
  ],
  title: "A Dangerous Mission! Journey to the Land of Waves!",
  episodeType: "standard",
  stillPath: "/iFwElDN6atOMRNsTnO2xpGr9cfH.jpg",
  voteAverage: 8.3,
  createdAt: "2026-10-28T18:42:02.697Z",
  updatedAt: "2026-10-28T18:42:02.697Z",
} as const satisfies Episode
