import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const scorpionS03e20 = {
  id: "01a1887f-56d7-72dc-8716-20adbc151656",
  type: "page-type/episode",
  slug: "scorpion-s03e20",
  description:
    "While on a mission to repair a turbine at a wind farm, Team Scorpion must race to save Paige and Happy before the cable holding the gondola they are in snaps and sends them plummeting to the ground.",
  ownLength: 60,
  ownProgress: 60,
  partOfCollections: ["season/scorpion-season-3"],
  position: 20,
  publishedAt: "2017-03-20",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1279240",
      externalLink: "https://www.themoviedb.org/tv/60797/season/3/episode/20",
    },
  ],
  title: "Broken Wind",
  episodeType: "standard",
  stillPath: "/1tVOi29Hu5w2f4R7U2e2Wg9mq4J.jpg",
  voteAverage: 7.3,
  createdAt: "2026-10-29T16:30:09.105Z",
  updatedAt: "2026-10-29T16:30:09.105Z",
} as const satisfies Episode
