import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS04e15 = {
  id: "01a1884b-ef67-74ba-b0aa-d872bddf8b45",
  type: "page-type/episode",
  slug: "ncis-s04e15",
  description:
    "When a dead body of a sailor is found in an abandoned part of the town, all the evidence seem to point that the person died from a drug overdose, but when the team uncover more evidence, it turns out to be a murder.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-4"],
  position: 15,
  publishedAt: "2007-02-13",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334486",
      externalLink: "https://www.themoviedb.org/tv/4614/season/4/episode/15",
    },
  ],
  title: "Friends and Lovers",
  episodeType: "standard",
  stillPath: "/uZbIw58bf7BvHwRcUCJ0w5mM67f.jpg",
  voteAverage: 7.5,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
