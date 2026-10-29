import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const personOfInterestS05e05 = {
  id: "01a18851-3df7-7cb9-8401-742f2740d767",
  type: "page-type/episode",
  slug: "person-of-interest-s05e05",
  description:
    "Reese protects an NYPD analyst whose investigation into a software glitch has drawn the attention of Samaritan. Also, Reese and Fusco are threatened by an ally of Elias’s, who is looking to avenge his friend’s death.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/person-of-interest-season-5"],
  position: 5,
  publishedAt: "2016-05-17",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1176501",
      externalLink: "https://www.themoviedb.org/tv/1411/season/5/episode/5",
    },
  ],
  title: "ShotSeeker",
  episodeType: "standard",
  stillPath: "/7RAdNPaYuIIIPLvqyNuKMyIcad2.jpg",
  voteAverage: 8.2,
  createdAt: "2026-10-29T15:39:48.082Z",
  updatedAt: "2026-10-29T15:39:48.082Z",
} as const satisfies Episode
