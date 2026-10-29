import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const criminalMindsS13e12 = {
  id: "01a18844-d7f7-7c79-bc9e-028b002177cd",
  type: "page-type/episode",
  slug: "criminal-minds-s13e12",
  description:
    "The BAU is called to New York when several casualties of a brutal nature are reported in Central Park.",
  ownLength: 42,
  ownProgress: 0,
  partOfCollections: ["season/criminal-minds-season-13"],
  position: 12,
  publishedAt: "2018-01-17",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1390863",
      externalLink: "https://www.themoviedb.org/tv/4057/season/13/episode/12",
    },
  ],
  title: "Bad Moon on the Rise",
  episodeType: "standard",
  stillPath: "/95uroCXo1bp9Gita9ZbDSNafnSQ.jpg",
  voteAverage: 7.5,
  createdAt: "2026-10-29T15:26:15.527Z",
  updatedAt: "2026-10-29T15:26:15.527Z",
} as const satisfies Episode
