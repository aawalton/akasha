import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const criminalMindsS10e22 = {
  id: "01a18844-d7f3-7462-bd8d-89ade356ee88",
  type: "page-type/episode",
  slug: "criminal-minds-s10e22",
  description:
    "When shooting victims are found in the Los Angeles area with possible links to criminal activity, the BAU searches for a vigilante UnSub.",
  ownLength: 42,
  ownProgress: 0,
  partOfCollections: ["season/criminal-minds-season-10"],
  position: 22,
  publishedAt: "2015-04-29",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1054201",
      externalLink: "https://www.themoviedb.org/tv/4057/season/10/episode/22",
    },
  ],
  title: "Protection",
  episodeType: "standard",
  stillPath: "/dKesYKX7d5xvLRJGErJdlvKTUbT.jpg",
  voteAverage: 7,
  createdAt: "2026-10-29T15:26:15.527Z",
  updatedAt: "2026-10-29T15:26:15.527Z",
} as const satisfies Episode
