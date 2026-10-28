import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const monsterS01e21 = {
  id: "01a183d8-0266-7d2b-b50f-bf406346ee0c",
  type: "page-type/episode",
  slug: "monster-s01e21",
  description:
    "Nina confronts Muller, one of the two detectives responsible for the death of her foster parents, the Fortners. Muller discovers that his protege, Roberto, is actually working for Johan and is now tasked with killing Nina.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/monster-season-1"],
  position: 21,
  publishedAt: "2004-08-25",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "749536",
      externalLink: "https://www.themoviedb.org/tv/30981/season/1/episode/21",
    },
  ],
  title: "Happy Holidays",
  episodeType: "standard",
  stillPath: "/evKSBqCNwbkcfwvgHOyFqRS75Wr.jpg",
  voteAverage: 8.3,
  createdAt: "2026-10-28T18:48:54.116Z",
  updatedAt: "2026-10-28T18:48:54.116Z",
} as const satisfies Episode
