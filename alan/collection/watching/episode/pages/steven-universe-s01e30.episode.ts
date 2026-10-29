import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const stevenUniverseS01e30 = {
  id: "01a18855-67e5-733b-aeec-03154634d6b2",
  type: "page-type/episode",
  slug: "steven-universe-s01e30",
  description:
    "Steven tries to mend Lars' and Sadie's friendship by taking them on vacation to a magical beach.",
  ownLength: 12,
  ownProgress: 0,
  partOfCollections: ["season/steven-universe-season-1"],
  position: 30,
  publishedAt: "2014-10-23",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1012739",
      externalLink: "https://www.themoviedb.org/tv/61175/season/1/episode/30",
    },
  ],
  title: "Island Adventure",
  episodeType: "standard",
  stillPath: "/q2Iqc2Tkn6kroyLRRxvtsCYXjBn.jpg",
  voteAverage: 6.8,
  createdAt: "2026-10-29T15:44:20.963Z",
  updatedAt: "2026-10-29T15:44:20.963Z",
} as const satisfies Episode
