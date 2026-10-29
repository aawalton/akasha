import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const babylon5S01e10 = {
  id: "01a18843-507e-782a-b941-c974b817177f",
  type: "page-type/episode",
  slug: "babylon-5-s01e10",
  description:
    "An alien couple comes to Dr. Franklin with their fatally ill son. The child could be cured by a simple operation, but the parents' religion specifically forbids it. Meanwhile, Ivanova escorts a damaged star liner through raider territory.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/babylon-5-signs-and-portents"],
  position: 10,
  publishedAt: "1994-04-27",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "235827",
      externalLink: "https://www.themoviedb.org/tv/3137/season/1/episode/10",
    },
  ],
  title: "Believers",
  episodeType: "standard",
  stillPath: "/nyOvA9vbGrWFQ508HtVQjFE7VWk.jpg",
  voteAverage: 7.1,
  createdAt: "2026-10-29T15:24:35.325Z",
  updatedAt: "2026-10-29T15:24:35.325Z",
} as const satisfies Episode
