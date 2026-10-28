import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const bananaFishS01e01 = {
  id: "01a183dd-ecba-701f-bd0b-82d977958ba8",
  type: "page-type/episode",
  slug: "banana-fish-s01e01",
  description:
    'In New York, Ash Lynx a boy with an perfect appearance and outstanding fighting power has been leading a street gang at the age of 17. One night, Ash is told the word "Banana Fish" from a man shot by his own subordinate. The word was that Griffin, his brother who was pretty crippled, often mentioned. At the same time, he meets Eiji Okumura, a Japanese boy who came as a photographer\'s assistant.',
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/banana-fish-season-1"],
  position: 1,
  publishedAt: "2018-07-06",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1514402",
      externalLink: "https://www.themoviedb.org/tv/80564/season/1/episode/1",
    },
  ],
  title: "A Perfect Day for Bananafish",
  episodeType: "standard",
  stillPath: "/enHk1kwxdWFGQ88TMAL5VcJg4Bf.jpg",
  voteAverage: 7.5,
  createdAt: "2026-10-28T18:55:21.786Z",
  updatedAt: "2026-10-28T18:55:21.786Z",
} as const satisfies Episode
