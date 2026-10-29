import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const criminalMindsS14e14 = {
  id: "01a18844-d7f9-7ae0-b623-07fd63e3f3ec",
  type: "page-type/episode",
  slug: "criminal-minds-s14e14",
  description:
    "The BAU investigates a string of murders taking place in supposedly haunted houses in Lewiston, Maine.",
  ownLength: 42,
  ownProgress: 0,
  partOfCollections: ["season/criminal-minds-season-14"],
  position: 14,
  publishedAt: "2019-01-30",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1675238",
      externalLink: "https://www.themoviedb.org/tv/4057/season/14/episode/14",
    },
  ],
  title: "Sick and Evil",
  episodeType: "standard",
  stillPath: "/wgusBS4Uqjs9AO4HYIPODbjucgg.jpg",
  voteAverage: 7.5,
  createdAt: "2026-10-29T15:26:15.527Z",
  updatedAt: "2026-10-29T15:26:15.527Z",
} as const satisfies Episode
