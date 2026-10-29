import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const goodWitchS06e04 = {
  id: "01a18849-352a-77eb-ab13-d11e41d1bb4a",
  type: "page-type/episode",
  slug: "good-witch-s06e04",
  description:
    "Martha fills in as the local Dear Debbie advice columnist, getting an anonymous letter that adds intrigue to a progressive dinner attended by all of the Middleton couples.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/good-witch-season-6"],
  position: 4,
  publishedAt: "2020-05-24",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2234089",
      externalLink: "https://www.themoviedb.org/tv/61864/season/6/episode/4",
    },
  ],
  title: "The Dinner",
  episodeType: "standard",
  stillPath: "/1NBxCIP6TbhpkW9E3T6SZ3ordba.jpg",
  voteAverage: 5,
  createdAt: "2026-10-29T15:31:01.543Z",
  updatedAt: "2026-10-29T15:31:01.543Z",
} as const satisfies Episode
