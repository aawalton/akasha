import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theOfficeS05e16 = {
  id: "01a18857-c36a-7124-a279-d682440ea5ec",
  type: "page-type/episode",
  slug: "the-office-s05e16",
  description:
    'A mystery woman at the office blood drive catches Michael\'s eye. Dwight and Kevin both find women at the "Lonely Hearts Party," while Jim and Pam are forced to leave because of PDAs—so they have lunch with Phyllis and Bob.',
  ownLength: 22,
  ownProgress: 0,
  partOfCollections: ["season/the-office-season-5"],
  position: 16,
  publishedAt: "2009-03-05",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "170229",
      externalLink: "https://www.themoviedb.org/tv/2316/season/5/episode/16",
    },
  ],
  title: "Blood Drive",
  episodeType: "standard",
  stillPath: "/x5RaXCvLqTV5ZOQSRWvCZTTRQfw.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-29T15:46:55.461Z",
  updatedAt: "2026-10-29T15:46:55.461Z",
} as const satisfies Episode
