import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const narutoS01e01 = {
  id: "01a183d1-bb4a-73b9-bcf4-6023b4321582",
  type: "page-type/episode",
  slug: "naruto-s01e01",
  description:
    "Welcome to the Village Hidden in the Leaves, where deadly serious Ninja roam the landscape and the seriously mischievous Naruto Uzumaki causes trouble everywhere he goes. But when he steals the ancient scroll of sealing, he unleashes a rare power rarely seen in a 12-year-old boy!",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/naruto-season-1"],
  position: 1,
  publishedAt: "2002-10-03",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1059121",
      externalLink: "https://www.themoviedb.org/tv/46260/season/1/episode/1",
    },
  ],
  title: "Enter: Naruto Uzumaki!",
  episodeType: "standard",
  stillPath: "/7xOP0rKDniTZKEaRM7seKfY9SG8.jpg",
  voteAverage: 7.3,
  createdAt: "2026-10-28T18:42:02.697Z",
  updatedAt: "2026-10-28T18:42:02.697Z",
} as const satisfies Episode
