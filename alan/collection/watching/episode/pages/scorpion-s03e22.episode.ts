import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const scorpionS03e22 = {
  id: "01a1887f-56d7-7d26-aa7c-b39462e6d311",
  type: "page-type/episode",
  slug: "scorpion-s03e22",
  description:
    "Team Scorpion gets trapped inside a failing and dangerous biodome designed for Mars while trying to extract a pair of scientists inside.",
  ownLength: 60,
  ownProgress: 60,
  partOfCollections: ["season/scorpion-season-3"],
  position: 22,
  publishedAt: "2017-04-17",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1298132",
      externalLink: "https://www.themoviedb.org/tv/60797/season/3/episode/22",
    },
  ],
  title: "Strife on Mars",
  episodeType: "standard",
  stillPath: "/tdV15euwdhi8yEsmd8Gww69U7qo.jpg",
  voteAverage: 7.4,
  createdAt: "2026-10-29T16:30:09.105Z",
  updatedAt: "2026-10-29T16:30:09.105Z",
} as const satisfies Episode
