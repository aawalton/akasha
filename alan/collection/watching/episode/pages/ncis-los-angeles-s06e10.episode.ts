import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisLosAngelesS06e10 = {
  id: "01a1884a-e0ee-73ee-ad52-e1cbad23566b",
  type: "page-type/episode",
  slug: "ncis-los-angeles-s06e10",
  description:
    "The team become involved in an investigation into the murders of Marines whose sons are at military academics.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/ncis-los-angeles-season-6"],
  position: 10,
  publishedAt: "2014-12-08",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1019271",
      externalLink: "https://www.themoviedb.org/tv/17610/season/6/episode/10",
    },
  ],
  title: "Reign Fall",
  episodeType: "standard",
  stillPath: "/1G93O04MX5dRNVsdg9HhxDnvWbh.jpg",
  voteAverage: 6,
  createdAt: "2026-10-29T15:32:51.047Z",
  updatedAt: "2026-10-29T15:32:51.047Z",
} as const satisfies Episode
