import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const criminalMindsS01e20 = {
  id: "01a18883-a8af-7274-9114-6753ecd71a3f",
  type: "page-type/episode",
  slug: "criminal-minds-s01e20",
  description:
    "The BAU works to capture a serial killer who has evaded capture by altering his appearance.",
  ownLength: 41,
  ownProgress: 41,
  partOfCollections: ["season/criminal-minds-season-1"],
  position: 20,
  publishedAt: "2006-04-19",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "282926",
      externalLink: "https://www.themoviedb.org/tv/4057/season/1/episode/20",
    },
  ],
  title: "Charm and Harm",
  episodeType: "standard",
  stillPath: "/3LJdisnh9U2YKENBdzcx0vIibFd.jpg",
  voteAverage: 7.7,
  createdAt: "2026-10-29T16:34:52.205Z",
  updatedAt: "2026-10-29T16:34:52.205Z",
} as const satisfies Episode
