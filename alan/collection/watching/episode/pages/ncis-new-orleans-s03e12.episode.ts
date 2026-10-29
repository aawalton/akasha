import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisNewOrleansS03e12 = {
  id: "01a1884b-3018-783a-b18e-2957cad95fed",
  type: "page-type/episode",
  slug: "ncis-new-orleans-s03e12",
  description:
    "After Pride travels to a deep sea oil rig for a murder investigation, the team uncovers a gas leak that's on the verge of causing a catastrophic explosion. Sebastian starts his NCIS Special Agent training at FLETC.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/ncis-new-orleans-season-3"],
  position: 12,
  publishedAt: "2017-01-24",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1254448",
      externalLink: "https://www.themoviedb.org/tv/61387/season/3/episode/12",
    },
  ],
  title: "Hell on the High Water",
  episodeType: "standard",
  stillPath: "/ntBExPRWLOmpN619dG5vv6yBBM8.jpg",
  voteAverage: 6,
  createdAt: "2026-10-29T15:33:11.316Z",
  updatedAt: "2026-10-29T15:33:11.316Z",
} as const satisfies Episode
