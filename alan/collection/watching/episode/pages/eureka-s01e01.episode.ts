import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const eurekaS01e01 = {
  id: "01a18848-3730-71b9-9a96-34ecd7a3f80e",
  type: "page-type/episode",
  slug: "eureka-s01e01",
  description:
    "An accident leads a U.S. Marshal and a teenage girl to a peculiar town populated by scientists and their families where 10-year-old boys are in 11th grade, the local diner doesn't believe in menus, and E=MC² was just the beginning. Just as the Marshal starts to get settled into the swing of things, a local scientist develops a bomb that seems to appear anywhere and eats all the matter around it.",
  ownLength: 85,
  ownProgress: 0,
  partOfCollections: ["season/eureka-season-1"],
  position: 1,
  publishedAt: "2006-07-18",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "335228",
      externalLink: "https://www.themoviedb.org/tv/4620/season/1/episode/1",
    },
  ],
  title: "Pilot",
  episodeType: "standard",
  stillPath: "/vGfGSIHmx7scZrVrjGBW9nhNula.jpg",
  voteAverage: 8.1,
  createdAt: "2026-10-29T15:29:56.528Z",
  updatedAt: "2026-10-29T15:29:56.528Z",
} as const satisfies Episode
