import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS17e06 = {
  id: "01a1884b-ef79-72e9-8eae-d00a2400b26e",
  type: "page-type/episode",
  slug: "ncis-s17e06",
  description:
    "After a Petty Officer’s son is found murdered at his “welcome home from prison” party, evidence suggests Kasie’s lifelong best friend, Dante Brown, is the suspect.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-17"],
  position: 6,
  publishedAt: "2019-11-05",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1953814",
      externalLink: "https://www.themoviedb.org/tv/4614/season/17/episode/6",
    },
  ],
  title: "Institutionalized",
  episodeType: "standard",
  stillPath: "/pybLwxo415qDekVrSNHwM64uI3N.jpg",
  voteAverage: 8.1,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
