import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const personOfInterestS02e07 = {
  id: "01a18851-3df4-75ef-b67b-315e0595b6a4",
  type: "page-type/episode",
  slug: "person-of-interest-s02e07",
  description:
    "The Machine gives Finch and Reese the number of a brilliant surgeon, but they soon discover that a resourceful third party has raised the stakes for this POI, forcing them to turn to an unlikely source for help.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/person-of-interest-season-2"],
  position: 7,
  publishedAt: "2012-11-15",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "64084",
      externalLink: "https://www.themoviedb.org/tv/1411/season/2/episode/7",
    },
  ],
  title: "Critical",
  episodeType: "standard",
  stillPath: "/tV8YWWtzWbH4FDHYWE0ZzGGhTk6.jpg",
  voteAverage: 8.1,
  createdAt: "2026-10-29T15:39:48.082Z",
  updatedAt: "2026-10-29T15:39:48.082Z",
} as const satisfies Episode
