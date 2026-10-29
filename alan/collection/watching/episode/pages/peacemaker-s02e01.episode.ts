import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const peacemakerS02e01 = {
  id: "01a18851-1215-7ab8-9ffb-fbfee5bcd0e4",
  type: "page-type/episode",
  slug: "peacemaker-s02e01",
  description:
    "While Peacemaker attempts to join the Justice Gang, Harcourt struggles to find work, and Economos takes on a challenging new assignment.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/peacemaker-season-2"],
  position: 1,
  publishedAt: "2025-08-21",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "6108954",
      externalLink: "https://www.themoviedb.org/tv/110492/season/2/episode/1",
    },
  ],
  title: "The Ties That Grind",
  episodeType: "standard",
  stillPath: "/hoL20ZxHYTyNqzYZw5AAgwhHZPP.jpg",
  voteAverage: 6.9,
  createdAt: "2026-10-29T15:39:36.852Z",
  updatedAt: "2026-10-29T15:39:36.852Z",
} as const satisfies Episode
