import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const criminalMindsS12e04 = {
  id: "01a18844-d7f5-7b38-a6f3-672807e6e180",
  type: "page-type/episode",
  slug: "criminal-minds-s12e04",
  description:
    "The BAU team searches for a serial killer along the Appalachian Trail in rural Virginia.",
  ownLength: 42,
  ownProgress: 0,
  partOfCollections: ["season/criminal-minds-season-12"],
  position: 4,
  publishedAt: "2016-10-26",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1232962",
      externalLink: "https://www.themoviedb.org/tv/4057/season/12/episode/4",
    },
  ],
  title: "Keeper",
  episodeType: "standard",
  stillPath: "/jXSUPLxtCyqUP2nUhB9Z5AK0PmU.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-29T15:26:15.527Z",
  updatedAt: "2026-10-29T15:26:15.527Z",
} as const satisfies Episode
