import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const scorpionS03e03 = {
  id: "01a1887f-56d5-7f7c-84a7-ca40d745852a",
  type: "page-type/episode",
  slug: "scorpion-s03e03",
  description:
    "When Walter is accidentally launched into space in a rocket, he hallucinates about Paige as his oxygen runs low, and Team Scorpion works feverishly to find a way to bring him home before he suffocates.",
  ownLength: 60,
  ownProgress: 60,
  partOfCollections: ["season/scorpion-season-3"],
  position: 3,
  publishedAt: "2016-10-10",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1222333",
      externalLink: "https://www.themoviedb.org/tv/60797/season/3/episode/3",
    },
  ],
  title: "It Isn’t the Fall That Kills You",
  episodeType: "standard",
  stillPath: "/8legTr6kOPUpWEp2k9b8dH3ej9m.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-29T16:30:09.105Z",
  updatedAt: "2026-10-29T16:30:09.105Z",
} as const satisfies Episode
