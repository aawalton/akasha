import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const myHeroAcademiaSeason5 = {
  id: "01a183d4-accc-7b97-b0a0-bcb4d66e97fd",
  type: "page-type/season",
  slug: "my-hero-academia-season-5",
  description:
    'Deku\'s next challenge, in order to become the "best hero," is a rivalry with Class 1-B, who also intend to prove that they are true heroes, with all their pride on the line! The students\' morale is boosted by a direct confrontation that hasn\'t occurred since the sports festival. Meanwhile, a new "something" is about to awaken within Deku.',
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show/my-hero-academia"],
  position: 5,
  publishedAt: "2021-03-27",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "149686",
      externalLink: "https://www.themoviedb.org/tv/65930/season/5",
    },
  ],
  title: "My Hero Academia Season 5",
  posterPath: "/uJz848GKjbSqjCkkF1J99HN9VaG.jpg",
  voteAverage: 8.1,
  createdAt: "2026-10-28T18:45:15.586Z",
  updatedAt: "2026-10-28T18:45:15.586Z",
} as const satisfies Season
