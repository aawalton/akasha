import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const criminalMindsS15e01 = {
  id: "01a18844-d7f9-7658-a8d1-24c2c53c6ce6",
  type: "page-type/episode",
  slug: "criminal-minds-s15e01",
  description:
    "The BAU team investigates an UnSub with striking similarities to Rossi’s latest obsession, “The Chameleon,” a.k.a. Everett Lynch, who nearly killed him and then disappeared.",
  ownLength: 42,
  ownProgress: 0,
  partOfCollections: ["season/criminal-minds-season-15"],
  position: 1,
  publishedAt: "2020-01-08",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1759192",
      externalLink: "https://www.themoviedb.org/tv/4057/season/15/episode/1",
    },
  ],
  title: "Under the Skin",
  episodeType: "standard",
  stillPath: "/xacQpF2nNvFyopJz8G5dAJnTc5W.jpg",
  voteAverage: 8.1,
  createdAt: "2026-10-29T15:26:15.527Z",
  updatedAt: "2026-10-29T15:26:15.527Z",
} as const satisfies Episode
