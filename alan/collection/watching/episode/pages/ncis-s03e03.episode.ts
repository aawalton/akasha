import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS03e03 = {
  id: "01a1884b-ef65-7d07-a79f-982c7412ab58",
  type: "page-type/episode",
  slug: "ncis-s03e03",
  description:
    "Gibbs is ordered to talk to a convict that is about to be executed, in order to discover information about the place where he hid his victims, but when the plan doesn't work, the team must solve the case in their own way.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-3"],
  position: 3,
  publishedAt: "2005-10-04",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334520",
      externalLink: "https://www.themoviedb.org/tv/4614/season/3/episode/3",
    },
  ],
  title: "Mind Games",
  episodeType: "standard",
  stillPath: "/tWC7L0IFbsjw4GCBFtGlr5bGzTq.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
