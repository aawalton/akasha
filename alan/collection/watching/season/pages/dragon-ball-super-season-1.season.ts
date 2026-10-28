import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const dragonBallSuperSeason1 = {
  id: "01a183dc-a499-7d49-aa6c-57603c022511",
  type: "page-type/season",
  slug: "dragon-ball-super-season-1",
  description:
    "With Majin Buu defeated, Goku has taken a completely new role as...a radish farmer?! With Earth at peace, our heroes have settled into normal lives. But they can’t get too comfortable. Far away, the powerful God of Destruction, Beerus, awakens to a prophecy revealing his demise at the hands of an even more formidable being. When his search for the Saiyan God brings him to Earth, can Goku and his friends take on their strongest foe yet?",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show/dragon-ball-super"],
  position: 1,
  publishedAt: "2015-07-05",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "66877",
      externalLink: "https://www.themoviedb.org/tv/62715/season/1",
    },
  ],
  title: "Dragon Ball Super Season 1",
  posterPath: "/fjVSnH7Syn7JUdbxX0Sq12T4fei.jpg",
  voteAverage: 8.9,
  createdAt: "2026-10-28T18:53:57.776Z",
  updatedAt: "2026-10-28T18:53:57.776Z",
} as const satisfies Season
