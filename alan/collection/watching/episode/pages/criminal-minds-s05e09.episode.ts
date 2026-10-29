import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const criminalMindsS05e09 = {
  id: "01a18844-d7eb-77f4-881c-bb716dc09962",
  type: "page-type/episode",
  slug: "criminal-minds-s05e09",
  description:
    "The BAU team races to help Hotchner find The Reaper and save his family before it's too late.",
  ownLength: 42,
  ownProgress: 0,
  partOfCollections: ["season/criminal-minds-season-5"],
  position: 9,
  publishedAt: "2009-11-25",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "283245",
      externalLink: "https://www.themoviedb.org/tv/4057/season/5/episode/9",
    },
  ],
  title: "100",
  episodeType: "standard",
  stillPath: "/w03lmgzuOqS0Rw32NFr3y3FSV84.jpg",
  voteAverage: 8.9,
  createdAt: "2026-10-29T15:26:15.527Z",
  updatedAt: "2026-10-29T15:26:15.527Z",
} as const satisfies Episode
