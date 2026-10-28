import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const narutoS01e42 = {
  id: "01a183d1-bb4d-7454-95d9-b5746a88e74c",
  type: "page-type/episode",
  slug: "naruto-s01e42",
  description:
    "Sakura and Ino prepare to settle the score once and for all! However, when Sakura becomes the victim of Ino's Mind-Body Switch Justu, will she be forced to give up the match?",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/naruto-season-1"],
  position: 42,
  publishedAt: "2003-07-23",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1145022",
      externalLink: "https://www.themoviedb.org/tv/46260/season/1/episode/42",
    },
  ],
  title: "The Ultimate Battle: Cha!",
  episodeType: "standard",
  stillPath: "/mje94QnuzJ0i3E9T41Et5wP5ws.jpg",
  voteAverage: 7.1,
  createdAt: "2026-10-28T18:42:02.697Z",
  updatedAt: "2026-10-28T18:42:02.697Z",
} as const satisfies Episode
