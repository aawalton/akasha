import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const warehouse13S01e02 = {
  id: "01a18859-886e-7386-9a70-15236cd85d68",
  type: "page-type/episode",
  slug: "warehouse-13-s01e02",
  description:
    "Pete and Myka are after a team of bank robbers who have a distinctive weapon. Meanwhile, Artie examines the security breach at the warehouse.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/warehouse-13-season-1"],
  position: 2,
  publishedAt: "2009-07-14",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "541574",
      externalLink: "https://www.themoviedb.org/tv/15819/season/1/episode/2",
    },
  ],
  title: "Resonance",
  episodeType: "standard",
  stillPath: "/5grnIgBHuEki43E986GxF7xJGP1.jpg",
  voteAverage: 7.6,
  createdAt: "2026-10-29T15:48:51.438Z",
  updatedAt: "2026-10-29T15:48:51.438Z",
} as const satisfies Episode
