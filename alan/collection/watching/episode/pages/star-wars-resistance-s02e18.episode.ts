import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starWarsResistanceS02e18 = {
  id: "01a18853-f9b1-76ca-9ead-5cf94745dd8d",
  type: "page-type/episode",
  slug: "star-wars-resistance-s02e18",
  description:
    "Kaz and Yeager attempt to rescue Tam from the First Order while trying to evade capture on a Star Destroyer. Meanwhile, the Colossus is in trouble and faces an impossible choice.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-resistance-season-2"],
  position: 18,
  publishedAt: "2020-01-26",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2008968",
      externalLink: "https://www.themoviedb.org/tv/79093/season/2/episode/18",
    },
  ],
  title: "The Escape",
  episodeType: "finale",
  stillPath: "/lC21alyI0NBVoa5OblX8TM18abI.jpg",
  voteAverage: 7.3,
  createdAt: "2026-10-29T15:42:47.214Z",
  updatedAt: "2026-10-29T15:42:47.214Z",
} as const satisfies Episode
