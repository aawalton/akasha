import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const castleS07e13 = {
  id: "01a1887e-1e4a-7e2f-91f1-0af2a76ec8ce",
  type: "page-type/episode",
  slug: "castle-s07e13",
  description:
    "Castle takes on a routine P.I. case, but the investigation turns deadly when he witnesses a murder.",
  ownLength: 44,
  ownProgress: 44,
  partOfCollections: ["season/castle-season-7"],
  position: 13,
  publishedAt: "2015-02-02",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1037627",
      externalLink: "https://www.themoviedb.org/tv/1419/season/7/episode/13",
    },
  ],
  title: "I, Witness",
  episodeType: "standard",
  stillPath: "/oJh5bmulUAytenm8HOBEAXhPUYn.jpg",
  voteAverage: 7.4,
  createdAt: "2026-10-29T16:28:49.084Z",
  updatedAt: "2026-10-29T16:28:49.084Z",
} as const satisfies Episode
