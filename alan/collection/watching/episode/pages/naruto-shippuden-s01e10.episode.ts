import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const narutoShippudenS01e10 = {
  id: "01a183d2-3bd4-7fc8-880f-8ab6f67947ce",
  type: "page-type/episode",
  slug: "naruto-shippuden-s01e10",
  description:
    "The Sand ninja fight against time to treat Kankuro. Even the Sand’s poison expert, Granny Chiyo, is baffled. The only hope lies with the reinforcements sent by Tsunade.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/naruto-shippuden-season-1"],
  position: 10,
  publishedAt: "2007-04-19",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "761482",
      externalLink: "https://www.themoviedb.org/tv/31910/season/1/episode/10",
    },
  ],
  title: "Sealing Jutsu: Nine Phantom Dragons",
  episodeType: "standard",
  stillPath: "/7FdrgAHug8AKSWrCZPPw4VLcJPq.jpg",
  voteAverage: 7.5,
  createdAt: "2026-10-28T18:42:35.603Z",
  updatedAt: "2026-10-28T18:42:35.603Z",
} as const satisfies Episode
