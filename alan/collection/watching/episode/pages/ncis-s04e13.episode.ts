import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS04e13 = {
  id: "01a1884b-ef66-7e48-aa3d-91706a8cc312",
  type: "page-type/episode",
  slug: "ncis-s04e13",
  description:
    "When the NCIS team learn that a missing ten kilograms of highly toxic chemical weapons are now in the hands of Mamoun Sharif, a wanted terrorist, they will have to find a way to find the man and stop him before it's too late.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-4"],
  position: 13,
  publishedAt: "2007-01-23",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334485",
      externalLink: "https://www.themoviedb.org/tv/4614/season/4/episode/13",
    },
  ],
  title: "Sharif Returns",
  episodeType: "standard",
  stillPath: "/A6kdUAqVIrt3LN7pQDmMDlqAKly.jpg",
  voteAverage: 7.6,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
