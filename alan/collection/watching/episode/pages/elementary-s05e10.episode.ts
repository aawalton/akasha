import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const elementaryS05e10 = {
  id: "01a1887e-62ac-7c22-976a-dac3319f888c",
  type: "page-type/episode",
  slug: "elementary-s05e10",
  description:
    "When Watson is implicated in a DEA investigation into doctors writing illegal prescriptions, she and Holmes search for the person using her medical license to sell drugs.",
  ownLength: 43,
  ownProgress: 43,
  partOfCollections: ["season/elementary-season-5"],
  position: 10,
  publishedAt: "2016-12-18",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1247139",
      externalLink: "https://www.themoviedb.org/tv/1415/season/5/episode/10",
    },
  ],
  title: "Pick Your Poison",
  episodeType: "mid-season",
  stillPath: "/psHhSY9nzRI3oUljcuOVsNMSBLo.jpg",
  voteAverage: 7.3,
  createdAt: "2026-10-29T16:29:06.597Z",
  updatedAt: "2026-10-29T16:29:06.597Z",
} as const satisfies Episode
