import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const soulEaterS01e01 = {
  id: "01a183d9-161e-7396-aca6-70b1c0689dc0",
  type: "page-type/episode",
  slug: "soul-eater-s01e01",
  description:
    "With 99 evil souls consumed, Soul just needs to defeat a witch to become a Death Scythe. He and Maka make their move against Blair - but a pointy hat doesn’t always mean witch!",
  ownLength: 25,
  ownProgress: 0,
  partOfCollections: ["season/soul-eater-season-1"],
  position: 1,
  publishedAt: "2008-04-07",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "844123",
      externalLink: "https://www.themoviedb.org/tv/37305/season/1/episode/1",
    },
  ],
  title: "Resonance of the Soul - Will Soul Eater Become a Death Scythe?",
  episodeType: "standard",
  stillPath: "/mpObk51DgsnJMDoAS9Q4SSxWb2o.jpg",
  voteAverage: 9,
  createdAt: "2026-10-28T18:50:04.702Z",
  updatedAt: "2026-10-28T18:50:04.702Z",
} as const satisfies Episode
