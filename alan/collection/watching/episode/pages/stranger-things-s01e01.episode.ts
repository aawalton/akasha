import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const strangerThingsS01e01 = {
  id: "01a18855-9111-7272-b294-8659b565613f",
  type: "page-type/episode",
  slug: "stranger-things-s01e01",
  description:
    "On his way home from a friend's house, young Will sees something terrifying. Nearby, a sinister secret lurks in the depths of a government lab.",
  ownLength: 48,
  ownProgress: 0,
  partOfCollections: ["season/stranger-things-season-1"],
  position: 1,
  publishedAt: "2016-07-15",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1198665",
      externalLink: "https://www.themoviedb.org/tv/66732/season/1/episode/1",
    },
  ],
  title: "Chapter One: The Vanishing of Will Byers",
  episodeType: "standard",
  stillPath: "/6jSA6JpxNDV63aDXpmsUFCjCINb.jpg",
  voteAverage: 8.5,
  createdAt: "2026-10-29T15:44:31.505Z",
  updatedAt: "2026-10-29T15:44:31.505Z",
} as const satisfies Episode
