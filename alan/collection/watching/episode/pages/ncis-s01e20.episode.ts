import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS01e20 = {
  id: "01a1884b-ef63-76d0-a655-30be0ba155ab",
  type: "page-type/episode",
  slug: "ncis-s01e20",
  description:
    "A Marine goes missing after a date with a reporter. During the investigation, the team discover that three former members of his unit are dead and suspect the unit commander to be a serial killer.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-1"],
  position: 20,
  publishedAt: "2004-05-04",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334449",
      externalLink: "https://www.themoviedb.org/tv/4614/season/1/episode/20",
    },
  ],
  title: "Missing",
  episodeType: "standard",
  stillPath: "/d2Pki0ftndfhsPnIyQSPAGIQ7kD.jpg",
  voteAverage: 7.5,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
