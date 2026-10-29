import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const scorpionS03e04 = {
  id: "01a1887f-56d5-7a98-abe4-fd6f8f5527a3",
  type: "page-type/episode",
  slug: "scorpion-s03e04",
  description:
    "Team Scorpion must find a boy from Ralph’s class who goes missing on a field trip after he accidentally has a run-in with a deadly criminal. Also, Toby gets closer to finding out the identity of Happy’s husband.",
  ownLength: 60,
  ownProgress: 60,
  partOfCollections: ["season/scorpion-season-3"],
  position: 4,
  publishedAt: "2016-10-17",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1222334",
      externalLink: "https://www.themoviedb.org/tv/60797/season/3/episode/4",
    },
  ],
  title: "Little Boy Lost",
  episodeType: "standard",
  stillPath: "/92AwdEUxgpMK2SzJ6AlYfoUEqMR.jpg",
  voteAverage: 8.1,
  createdAt: "2026-10-29T16:30:09.105Z",
  updatedAt: "2026-10-29T16:30:09.105Z",
} as const satisfies Episode
