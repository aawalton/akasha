import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const elementaryS06e20 = {
  id: "01a1887e-62af-762d-b393-dae1e6f79a25",
  type: "page-type/episode",
  slug: "elementary-s06e20",
  description:
    "Holmes and Watson’s deadly conflict with Sherlock’s former friend Michael intensifies when their newest victim looks to be the serial killer’s latest prey.",
  ownLength: 42,
  ownProgress: 42,
  partOfCollections: ["season/elementary-season-6"],
  position: 20,
  publishedAt: "2018-09-10",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1554647",
      externalLink: "https://www.themoviedb.org/tv/1415/season/6/episode/20",
    },
  ],
  title: "Fit to Be Tied",
  episodeType: "standard",
  stillPath: "/9pNcBrSinKB6XorrOWAuotQJrjY.jpg",
  voteAverage: 7.2,
  createdAt: "2026-10-29T16:29:06.597Z",
  updatedAt: "2026-10-29T16:29:06.597Z",
} as const satisfies Episode
