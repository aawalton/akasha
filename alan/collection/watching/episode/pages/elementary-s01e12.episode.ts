import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const elementaryS01e12 = {
  id: "01a1887e-62a6-731d-b970-12d686a4222c",
  type: "page-type/episode",
  slug: "elementary-s01e12",
  description:
    "Sherlock is reunited with “M.” a British criminal who appears to have followed Sherlock to New York. Meanwhile, Joan has reservations about leaving Sherlock and taking on a new client.",
  ownLength: 43,
  ownProgress: 43,
  partOfCollections: ["season/elementary-season-1"],
  position: 12,
  publishedAt: "2013-01-10",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "64296",
      externalLink: "https://www.themoviedb.org/tv/1415/season/1/episode/12",
    },
  ],
  title: "M.",
  episodeType: "standard",
  stillPath: "/oHk0yhde4She7LfqeRQ6CDF1Dgv.jpg",
  voteAverage: 8.3,
  createdAt: "2026-10-29T16:29:06.597Z",
  updatedAt: "2026-10-29T16:29:06.597Z",
} as const satisfies Episode
