import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const monsterS01e04 = {
  id: "01a183d8-0265-70a4-bdc6-5319c4aff92a",
  type: "page-type/episode",
  slug: "monster-s01e04",
  description:
    "Adolf Junkers has information about the serial murders that is vital to the police, but he is afraid to reveal them. Dr. Tenma's care for Adolf Junkers however wins him over. His close relationship with Junkers however leads him to a night of shocking horror.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/monster-season-1"],
  position: 4,
  publishedAt: "2004-04-28",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "749519",
      externalLink: "https://www.themoviedb.org/tv/30981/season/1/episode/4",
    },
  ],
  title: "Night of the Execution",
  episodeType: "standard",
  stillPath: "/DpBHxNXO5VHwLTInBGi80L5Io.jpg",
  voteAverage: 8.5,
  createdAt: "2026-10-28T18:48:54.116Z",
  updatedAt: "2026-10-28T18:48:54.116Z",
} as const satisfies Episode
