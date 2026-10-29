import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const friendsS10e08 = {
  id: "01a18848-c2c7-7f88-b627-dcd1ff19f305",
  type: "page-type/episode",
  slug: "friends-s10e08",
  description:
    "Joey, Ross, Rachel and Phoebe convince Monica and Chandler to host a Thanksgiving dinner, however the four of them end up arriving an hour late as the boys decide to go to Rangers game, while the girls take Emma to a baby beauty pageant. This enrages Monica and she refuses to let the famished guests into her and Chandler's apartment which causes even bigger problems.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/friends-season-10"],
  position: 8,
  publishedAt: "2003-11-20",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "87598",
      externalLink: "https://www.themoviedb.org/tv/1668/season/10/episode/8",
    },
  ],
  title: "The One with the Late Thanksgiving",
  episodeType: "mid-season",
  stillPath: "/wy23se5VuWF574aHoljxvwoSudK.jpg",
  voteAverage: 8.6,
  createdAt: "2026-10-29T15:30:32.248Z",
  updatedAt: "2026-10-29T15:30:32.248Z",
} as const satisfies Episode
