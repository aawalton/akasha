import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const criminalMindsS12e21 = {
  id: "01a18844-d7f6-7cbf-b884-4ba9c2bd0ea9",
  type: "page-type/episode",
  slug: "criminal-minds-s12e21",
  description:
    "When Reid fears his mother has been abducted, he asks the BAU to investigate while he's stuck in prison.",
  ownLength: 42,
  ownProgress: 0,
  partOfCollections: ["season/criminal-minds-season-12"],
  position: 21,
  publishedAt: "2017-05-03",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1308554",
      externalLink: "https://www.themoviedb.org/tv/4057/season/12/episode/21",
    },
  ],
  title: "Green Light",
  episodeType: "standard",
  stillPath: "/zWj1c9LAJ6UqucxOL1Cuzr71lHt.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T15:26:15.527Z",
  updatedAt: "2026-10-29T15:26:15.527Z",
} as const satisfies Episode
