import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const goodWitchS06e01 = {
  id: "01a18849-352a-7f57-9792-06dac3aaa160",
  type: "page-type/episode",
  slug: "good-witch-s06e01",
  description:
    "Now empty-nesters, Cassie and Sam celebrate their first wedding anniversary. Abigail and Donovan’s relationship continues to be challenged by their families’ curse. Cassie’s Grey House guest has intentions for visiting Middleton that are different than she claims.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/good-witch-season-6"],
  position: 1,
  publishedAt: "2020-05-03",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2234086",
      externalLink: "https://www.themoviedb.org/tv/61864/season/6/episode/1",
    },
  ],
  title: "The Anniversary",
  episodeType: "standard",
  stillPath: "/ndF1ApOyEZEblYseFQcRQBke9CF.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T15:31:01.543Z",
  updatedAt: "2026-10-29T15:31:01.543Z",
} as const satisfies Episode
