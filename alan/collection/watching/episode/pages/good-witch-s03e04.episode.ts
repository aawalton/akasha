import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const goodWitchS03e04 = {
  id: "01a18849-3528-72c7-8047-a3ca774d9348",
  type: "page-type/episode",
  slug: "good-witch-s03e04",
  description:
    "Cassie helps Ben find an old romantic film to showcase at the refurbished Middleton Theater's opening night. Martha's promises to the town are in jeopardy when she overextends herself with the Middleton budget.",
  ownLength: 41,
  ownProgress: 0,
  partOfCollections: ["season/good-witch-season-3"],
  position: 4,
  publishedAt: "2017-05-21",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1300323",
      externalLink: "https://www.themoviedb.org/tv/61864/season/3/episode/4",
    },
  ],
  title: "How to Say 'I Love You!'",
  episodeType: "standard",
  stillPath: "/sooaTxVx3MRU7LUlk8GJePP89LL.jpg",
  voteAverage: 6,
  createdAt: "2026-10-29T15:31:01.543Z",
  updatedAt: "2026-10-29T15:31:01.543Z",
} as const satisfies Episode
