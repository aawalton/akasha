import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const studioCS03e04 = {
  id: "01a18885-00f9-781a-82a1-22fca4f84fd2",
  type: "page-type/episode",
  slug: "studio-c-s03e04",
  description:
    "An uncooperative lineup suspect won't read his line to the cops, and Ann meets her greatest heartthrob--R.L. Stine.",
  ownLength: 24,
  ownProgress: 24,
  partOfCollections: ["season/studio-c-season-3"],
  position: 4,
  publishedAt: "2013-10-28",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "5580139",
      externalLink: "https://www.themoviedb.org/tv/68207/season/3/episode/4",
    },
  ],
  title: "Season 3 Episode 4",
  episodeType: "standard",
  stillPath: "/7y8GMM0KBDwFn3cLem5MSbLGSAE.jpg",
  voteAverage: 0,
  createdAt: "2026-10-29T16:36:20.344Z",
  updatedAt: "2026-10-29T16:36:20.344Z",
} as const satisfies Episode
