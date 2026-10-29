import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theMentalistS01e23 = {
  id: "01a18880-75e5-7026-a854-9aae5a9da07f",
  type: "page-type/episode",
  slug: "the-mentalist-s01e23",
  description:
    "Lisbon fears that the serial killer Red John is drawing Patrick Jane into a trap when the CBI team investigates the murder of a young girl and the abduction of her twin sister.",
  ownLength: 44,
  ownProgress: 44,
  partOfCollections: ["season/the-mentalist-season-1"],
  position: 23,
  publishedAt: "2009-05-19",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "367712",
      externalLink: "https://www.themoviedb.org/tv/5920/season/1/episode/23",
    },
  ],
  title: "Red John's Footsteps",
  episodeType: "finale",
  stillPath: "/ibJykrUSEL7qSK9FnSJpRKTmJnr.jpg",
  voteAverage: 8.4,
  createdAt: "2026-10-29T16:31:22.596Z",
  updatedAt: "2026-10-29T16:31:22.596Z",
} as const satisfies Episode
