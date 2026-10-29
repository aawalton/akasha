import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const criminalMindsS05e03 = {
  id: "01a18844-d7eb-78de-acc6-02f801670e29",
  type: "page-type/episode",
  slug: "criminal-minds-s05e03",
  description:
    "The BAU investigates a case in Rossi's hometown that involves both his personal and professional life.",
  ownLength: 40,
  ownProgress: 0,
  partOfCollections: ["season/criminal-minds-season-5"],
  position: 3,
  publishedAt: "2009-10-07",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1005476",
      externalLink: "https://www.themoviedb.org/tv/4057/season/5/episode/3",
    },
  ],
  title: "Reckoner",
  episodeType: "standard",
  stillPath: "/qmv4tofcM2l1QbBKVPikHHU6gir.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-29T15:26:15.527Z",
  updatedAt: "2026-10-29T15:26:15.527Z",
} as const satisfies Episode
