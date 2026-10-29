import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const scorpionS02e22 = {
  id: "01a1887f-56d4-771f-aa68-2f155d355b10",
  type: "page-type/episode",
  slug: "scorpion-s02e22",
  description:
    "Team Scorpion is hired by the Department of Defense to break into Fort Knox and “steal” a precious artifact in order to test their security, but they must break in a second time when they find something dangerous hidden inside the object.",
  ownLength: 43,
  ownProgress: 43,
  partOfCollections: ["season/scorpion-season-2"],
  position: 22,
  publishedAt: "2016-04-11",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1181692",
      externalLink: "https://www.themoviedb.org/tv/60797/season/2/episode/22",
    },
  ],
  title: "Hard Knox",
  episodeType: "standard",
  stillPath: "/d95KIML37AEzdtwNFKAXe4r97Tf.jpg",
  voteAverage: 7.3,
  createdAt: "2026-10-29T16:30:09.105Z",
  updatedAt: "2026-10-29T16:30:09.105Z",
} as const satisfies Episode
