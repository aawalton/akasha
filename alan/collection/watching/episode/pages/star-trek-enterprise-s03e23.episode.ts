import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekEnterpriseS03e23 = {
  id: "01a18852-d433-71f7-a92d-4fcb54061a99",
  type: "page-type/episode",
  slug: "star-trek-enterprise-s03e23",
  description:
    "With help from Xindi allies, the Enterprise crew attempts to stop the arming of the Weapon aimed toward Earth.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-enterprise-season-3"],
  position: 23,
  publishedAt: "2004-05-19",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "15612",
      externalLink: "https://www.themoviedb.org/tv/314/season/3/episode/23",
    },
  ],
  title: "Countdown",
  episodeType: "standard",
  stillPath: "/1xuf7glHcm2UqknW77peHTTlZEW.jpg",
  voteAverage: 8.4,
  createdAt: "2026-10-29T15:41:32.079Z",
  updatedAt: "2026-10-29T15:41:32.079Z",
} as const satisfies Episode
