import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS16e23 = {
  id: "01a1884b-ef78-7aeb-84ef-1521ffefa537",
  type: "page-type/episode",
  slug: "ncis-s16e23",
  description:
    "The NCIS team investigates the murder of a Marine Sergeant in the States who was hailed as a war hero for his efforts overseas.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-16"],
  position: 23,
  publishedAt: "2019-05-14",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1779350",
      externalLink: "https://www.themoviedb.org/tv/4614/season/16/episode/23",
    },
  ],
  title: "Lost Time",
  episodeType: "standard",
  stillPath: "/7T5uKguGiPf93SgldUTMT6IHJs.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
