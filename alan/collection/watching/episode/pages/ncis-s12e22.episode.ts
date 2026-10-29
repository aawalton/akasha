import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS12e22 = {
  id: "01a1884b-ef73-7f59-8621-b03d8de9d46b",
  type: "page-type/episode",
  slug: "ncis-s12e22",
  description:
    "Special Agent Ned Dorneget from NCIS cyber operations assists the team when a Navy ensign who worked in the Office of Naval Intelligence is murdered.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-12"],
  position: 22,
  publishedAt: "2015-04-28",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1053458",
      externalLink: "https://www.themoviedb.org/tv/4614/season/12/episode/22",
    },
  ],
  title: "Troll",
  episodeType: "standard",
  stillPath: "/pXOL9ghruQBjT1SG5NgzPm56uig.jpg",
  voteAverage: 6.7,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
