import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const criminalMindsS06e01 = {
  id: "01a18844-d7ec-7097-b2eb-00de87f3cb05",
  type: "page-type/episode",
  slug: "criminal-minds-s06e01",
  description:
    "The BAU team closes in on the serial killer as he continues his murder spree throughout Los Angeles - with Detective Spicer's kidnapped daughter as his hostage - in the conclusion of last season's cliffhanger.",
  ownLength: 42,
  ownProgress: 0,
  partOfCollections: ["season/criminal-minds-season-6"],
  position: 1,
  publishedAt: "2010-09-22",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "283290",
      externalLink: "https://www.themoviedb.org/tv/4057/season/6/episode/1",
    },
  ],
  title: "The Longest Night",
  episodeType: "standard",
  stillPath: "/7Du190T9a3orOs6nUcTxc1LPfDS.jpg",
  voteAverage: 7.7,
  createdAt: "2026-10-29T15:26:15.527Z",
  updatedAt: "2026-10-29T15:26:15.527Z",
} as const satisfies Episode
