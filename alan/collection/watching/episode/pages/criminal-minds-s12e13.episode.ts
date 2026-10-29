import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const criminalMindsS12e13 = {
  id: "01a18844-d7f6-7564-8ce4-0bf56989972e",
  type: "page-type/episode",
  slug: "criminal-minds-s12e13",
  description:
    "When a BAU member gets in trouble in Mexico, the team enlists the services of the International Response Team for their help.",
  ownLength: 42,
  ownProgress: 0,
  partOfCollections: ["season/criminal-minds-season-12"],
  position: 13,
  publishedAt: "2017-02-15",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1270146",
      externalLink: "https://www.themoviedb.org/tv/4057/season/12/episode/13",
    },
  ],
  title: "Spencer",
  episodeType: "standard",
  stillPath: "/utCZ1KZCzJf65McanxIR6eo6jio.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-29T15:26:15.527Z",
  updatedAt: "2026-10-29T15:26:15.527Z",
} as const satisfies Episode
