import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisLosAngelesS06e05 = {
  id: "01a1884a-e0ee-718f-ae0f-bbf79fc7effe",
  type: "page-type/episode",
  slug: "ncis-los-angeles-s06e05",
  description:
    "Callen and Sam make their way to Mexico to locate the only employee who escaped a professional hit at the Department of Defense. Back in America, the rest of the team work to discover the motive behind the shooting.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/ncis-los-angeles-season-6"],
  position: 5,
  publishedAt: "2014-10-27",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1012081",
      externalLink: "https://www.themoviedb.org/tv/17610/season/6/episode/5",
    },
  ],
  title: "Black Budget",
  episodeType: "standard",
  stillPath: "/3w95NorfqyQmv3NCDlDanOhq2MV.jpg",
  voteAverage: 6.7,
  createdAt: "2026-10-29T15:32:51.047Z",
  updatedAt: "2026-10-29T15:32:51.047Z",
} as const satisfies Episode
