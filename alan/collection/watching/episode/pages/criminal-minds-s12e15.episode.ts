import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const criminalMindsS12e15 = {
  id: "01a18844-d7f6-7bb7-b8cd-f47acbcbe78e",
  type: "page-type/episode",
  slug: "criminal-minds-s12e15",
  description:
    "The BAU investigates when several young men and women are victims of disfiguring acid attacks. Also, Dr. Reid begins to settle into his new surroundings.",
  ownLength: 42,
  ownProgress: 0,
  partOfCollections: ["season/criminal-minds-season-12"],
  position: 15,
  publishedAt: "2017-03-01",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1279279",
      externalLink: "https://www.themoviedb.org/tv/4057/season/12/episode/15",
    },
  ],
  title: "Alpha Male",
  episodeType: "standard",
  stillPath: "/8XVZBO1lnmOCTPuHeVGJx8tKITS.jpg",
  voteAverage: 8.5,
  createdAt: "2026-10-29T15:26:15.527Z",
  updatedAt: "2026-10-29T15:26:15.527Z",
} as const satisfies Episode
