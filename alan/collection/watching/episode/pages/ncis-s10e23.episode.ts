import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS10e23 = {
  id: "01a1884b-ef70-7b93-8be5-dcf74f4f8889",
  type: "page-type/episode",
  slug: "ncis-s10e23",
  description:
    "The team examines whether a Petty Officer is suffering from paranoia or if his claims of being followed are tied to a matter of national security.",
  ownLength: 42,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-10"],
  position: 23,
  publishedAt: "2013-05-07",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334693",
      externalLink: "https://www.themoviedb.org/tv/4614/season/10/episode/23",
    },
  ],
  title: "Double Blind",
  episodeType: "standard",
  stillPath: "/ovc29iwtyDIaqRD8BjMyyZkYsWi.jpg",
  voteAverage: 7,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
