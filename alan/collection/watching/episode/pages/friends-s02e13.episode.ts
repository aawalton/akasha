import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const friendsS02e13 = {
  id: "01a18848-c2ba-734f-8aa7-de7e18f7fae7",
  type: "page-type/episode",
  slug: "friends-s02e13",
  description:
    "Rachel and Monica compete for the affections of Jean-Claude Van Damme after meeting him on a movie set. Chandler meets a former schoolmate while an excited Joey gets a role as an extra in the movie. Ross and Marcel go on a whirlwind tour of the city.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/friends-season-2"],
  position: 13,
  publishedAt: "1996-01-28",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4537938",
      externalLink: "https://www.themoviedb.org/tv/1668/season/2/episode/13",
    },
  ],
  title: "The One After the Super Bowl (2)",
  episodeType: "standard",
  stillPath: "/tNM92lAgpRacWZ2K46ixJF02o8r.jpg",
  voteAverage: 8.3,
  createdAt: "2026-10-29T15:30:32.248Z",
  updatedAt: "2026-10-29T15:30:32.248Z",
} as const satisfies Episode
