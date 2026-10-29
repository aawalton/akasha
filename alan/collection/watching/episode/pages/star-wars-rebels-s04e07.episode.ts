import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starWarsRebelsS04e07 = {
  id: "01a18853-ddff-7136-8519-6e693e2d2a20",
  type: "page-type/episode",
  slug: "star-wars-rebels-s04e07",
  description:
    "Tracked back to their hidden base by a mysterious Imperial agent, the rebels must trust some seemingly dangerous native creatures, who are far more than meets the eye.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-rebels-season-4"],
  position: 7,
  publishedAt: "2017-11-06",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1382174",
      externalLink: "https://www.themoviedb.org/tv/60554/season/4/episode/7",
    },
  ],
  title: "Kindred",
  episodeType: "standard",
  stillPath: "/qURpDGe5lLd7pepWcvdQaWPf2FD.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-29T15:42:40.123Z",
  updatedAt: "2026-10-29T15:42:40.123Z",
} as const satisfies Episode
