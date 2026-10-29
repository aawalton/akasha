import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const criminalMindsS09e10 = {
  id: "01a18844-d7f1-73de-b531-778a5f1840bb",
  type: "page-type/episode",
  slug: "criminal-minds-s09e10",
  description:
    "When a young boy goes missing from his home in St. Louis, the BAU reinvestigates a similar cold case to search for the UnSub.",
  ownLength: 42,
  ownProgress: 0,
  partOfCollections: ["season/criminal-minds-season-9"],
  position: 10,
  publishedAt: "2013-11-27",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "968644",
      externalLink: "https://www.themoviedb.org/tv/4057/season/9/episode/10",
    },
  ],
  title: "The Caller",
  episodeType: "standard",
  stillPath: "/vDusz53q4DDF7q0MdiKdqzkN50k.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-29T15:26:15.527Z",
  updatedAt: "2026-10-29T15:26:15.527Z",
} as const satisfies Episode
