import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekEnterpriseS03e24 = {
  id: "01a18852-d433-7ccf-ac43-757075305c55",
  type: "page-type/episode",
  slug: "star-trek-enterprise-s03e24",
  description:
    "Archer puts his life on the line in a risky gambit to intercept the Xindi superweapon and disarm it from within.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-enterprise-season-3"],
  position: 24,
  publishedAt: "2004-05-26",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "15589",
      externalLink: "https://www.themoviedb.org/tv/314/season/3/episode/24",
    },
  ],
  title: "Zero Hour",
  episodeType: "finale",
  stillPath: "/8R6mmKvXcH773QvZGK1bHhqZj0j.jpg",
  voteAverage: 8.3,
  createdAt: "2026-10-29T15:41:32.079Z",
  updatedAt: "2026-10-29T15:41:32.079Z",
} as const satisfies Episode
