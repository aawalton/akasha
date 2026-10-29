import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const scorpionS02e01 = {
  id: "01a1887f-56d2-73eb-909f-6f793cf3cf13",
  type: "page-type/episode",
  slug: "scorpion-s02e01",
  description:
    "The new Director of Homeland Security, Adriana Molina, reunites the team when a nuclear powered Russian satellite is knocked out of orbit and must be diverted before it detonates over Southern California. Paige and Walter face their feelings for each other when hospital footage reveals that Paige kissed him.",
  ownLength: 43,
  ownProgress: 43,
  partOfCollections: ["season/scorpion-season-2"],
  position: 1,
  publishedAt: "2015-09-21",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1108930",
      externalLink: "https://www.themoviedb.org/tv/60797/season/2/episode/1",
    },
  ],
  title: "Satellite of Love",
  episodeType: "standard",
  stillPath: "/8LcAEjN8Rsty6m21eNUpqUTSroI.jpg",
  voteAverage: 7.2,
  createdAt: "2026-10-29T16:30:09.105Z",
  updatedAt: "2026-10-29T16:30:09.105Z",
} as const satisfies Episode
