import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const warehouse13S03e12 = {
  id: "01a18859-8870-7644-885c-73abc2f99c54",
  type: "page-type/episode",
  slug: "warehouse-13-s03e12",
  description:
    "Pete and Myka race to stop Sykes from using his own cache of artifacts to destroy them and the Warehouse.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/warehouse-13-season-3"],
  position: 12,
  publishedAt: "2011-10-03",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "541601",
      externalLink: "https://www.themoviedb.org/tv/15819/season/3/episode/12",
    },
  ],
  title: "Stand (2)",
  episodeType: "standard",
  stillPath: "/nz180ovEogrpYBEv2kTKykDCRH9.jpg",
  voteAverage: 8.6,
  createdAt: "2026-10-29T15:48:51.438Z",
  updatedAt: "2026-10-29T15:48:51.438Z",
} as const satisfies Episode
