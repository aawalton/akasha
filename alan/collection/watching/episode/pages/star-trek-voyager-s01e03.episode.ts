import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekVoyagerS01e03 = {
  id: "01a18853-ac89-78c4-ace0-bd98696c3c0b",
  type: "page-type/episode",
  slug: "star-trek-voyager-s01e03",
  description:
    "Stardate: Unknown. After being hit by the shockwave of a devastating planet-wide explosion, Voyager investigates. While on the surface, Janeway and Paris are accidentally 'shifted' one day into the past.",
  ownLength: 46,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-voyager-season-1"],
  position: 3,
  publishedAt: "1995-01-30",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "112908",
      externalLink: "https://www.themoviedb.org/tv/1855/season/1/episode/3",
    },
  ],
  title: "Time and Again",
  episodeType: "standard",
  stillPath: "/ynUy7THjRMD0HmdzxV8BToYS1V1.jpg",
  voteAverage: 7,
  createdAt: "2026-10-29T15:42:27.464Z",
  updatedAt: "2026-10-29T15:42:27.464Z",
} as const satisfies Episode
