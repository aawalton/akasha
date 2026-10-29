import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisNewOrleansS01e07 = {
  id: "01a1884b-3015-7dad-a88c-9aa30043b754",
  type: "page-type/episode",
  slug: "ncis-new-orleans-s01e07",
  description:
    "The team investigate the murder of a tech liaison, who had been assigned to a private developer.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/ncis-new-orleans-season-1"],
  position: 7,
  publishedAt: "2014-11-11",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1014427",
      externalLink: "https://www.themoviedb.org/tv/61387/season/1/episode/7",
    },
  ],
  title: "Watch Over Me",
  episodeType: "standard",
  stillPath: "/3mD0U2La9jdHazv4vFosJFXYzjX.jpg",
  voteAverage: 6.8,
  createdAt: "2026-10-29T15:33:11.316Z",
  updatedAt: "2026-10-29T15:33:11.316Z",
} as const satisfies Episode
