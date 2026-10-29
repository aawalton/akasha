import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const warehouse13S01e11 = {
  id: "01a18859-886f-7026-b92f-ae350ac0c916",
  type: "page-type/episode",
  slug: "warehouse-13-s01e11",
  description:
    "After receiving word that her father is dying, Myka travels home to see her parents.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/warehouse-13-season-1"],
  position: 11,
  publishedAt: "2009-09-15",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "541572",
      externalLink: "https://www.themoviedb.org/tv/15819/season/1/episode/11",
    },
  ],
  title: "Nevermore",
  episodeType: "standard",
  stillPath: "/vKtVWgoW9s5hTyJukGv6KZtyDqF.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-29T15:48:51.438Z",
  updatedAt: "2026-10-29T15:48:51.438Z",
} as const satisfies Episode
