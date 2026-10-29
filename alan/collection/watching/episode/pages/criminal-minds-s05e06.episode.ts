import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const criminalMindsS05e06 = {
  id: "01a18844-d7eb-7d43-b6ab-1dabfdf02ef5",
  type: "page-type/episode",
  slug: "criminal-minds-s05e06",
  description:
    "The BAU team tracks a serial killer who keeps the eyes of his victims as souvenirs.",
  ownLength: 42,
  ownProgress: 0,
  partOfCollections: ["season/criminal-minds-season-5"],
  position: 6,
  publishedAt: "2009-11-04",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "283240",
      externalLink: "https://www.themoviedb.org/tv/4057/season/5/episode/6",
    },
  ],
  title: "The Eyes Have It",
  episodeType: "standard",
  stillPath: "/bT54VCTy2SUWrMvq7NhyrJgOos5.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-29T15:26:15.527Z",
  updatedAt: "2026-10-29T15:26:15.527Z",
} as const satisfies Episode
