import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const criminalMindsS13e15 = {
  id: "01a18844-d7f7-7229-9c90-99948f69f1a6",
  type: "page-type/episode",
  slug: "criminal-minds-s13e15",
  description:
    "The FBI's assistant director of national security, Linda Barnes, joins the BAU as they investigate a quadruple homicide of a group of roommates in St. Louis.",
  ownLength: 42,
  ownProgress: 0,
  partOfCollections: ["season/criminal-minds-season-13"],
  position: 15,
  publishedAt: "2018-03-07",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1430525",
      externalLink: "https://www.themoviedb.org/tv/4057/season/13/episode/15",
    },
  ],
  title: "Annihilator",
  episodeType: "standard",
  stillPath: "/8Y6rW8HVn0PHeBHvmxikPHYRAkP.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T15:26:15.527Z",
  updatedAt: "2026-10-29T15:26:15.527Z",
} as const satisfies Episode
