import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const myHeroAcademiaSeason1 = {
  id: "01a183d4-accc-7e91-8f2f-444e7a9543fc",
  type: "page-type/season",
  slug: "my-hero-academia-season-1",
  description:
    "For his entire life, Izuku has dreamed of being a hero—an ambitious goal for anyone, but an especially challenging one for a boy without superpowers. That’s right: in a world where 80% of the population has some sort of special Gift, Izuku was unlucky enough to be born completely normal. But that won’t stop him from enrolling in one of the most prestigious hero academies in the world to learn what it truly means to be a hero.",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show/my-hero-academia"],
  position: 1,
  publishedAt: "2016-04-03",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "75441",
      externalLink: "https://www.themoviedb.org/tv/65930/season/1",
    },
  ],
  title: "My Hero Academia Season 1",
  posterPath: "/phuYuzqWW9ru8EA3HVjE9W2Rr3M.jpg",
  voteAverage: 8,
  createdAt: "2026-10-28T18:45:15.586Z",
  updatedAt: "2026-10-28T18:45:15.586Z",
} as const satisfies Season
