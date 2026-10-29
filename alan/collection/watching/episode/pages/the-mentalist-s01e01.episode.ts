import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theMentalistS01e01 = {
  id: "01a18880-75e4-7088-9aa2-6677771ddd65",
  type: "page-type/episode",
  slug: "the-mentalist-s01e01",
  description:
    "CBI consultant Patrick Jane, Senior Agent Teresa Lisbon and her team investigate the double murder in Palm Springs of a pro golfer's wife and her doctor, which has the hallmarks of a serial killer with a personal connection to Jane.",
  ownLength: 45,
  ownProgress: 45,
  partOfCollections: ["season/the-mentalist-season-1"],
  position: 1,
  publishedAt: "2008-09-23",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "367686",
      externalLink: "https://www.themoviedb.org/tv/5920/season/1/episode/1",
    },
  ],
  title: "Pilot",
  episodeType: "standard",
  stillPath: "/jDP0SSNdjDO6NANoZA8q1ps5khm.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T16:31:22.596Z",
  updatedAt: "2026-10-29T16:31:22.596Z",
} as const satisfies Episode
