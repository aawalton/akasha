import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theSarahJaneAdventuresS03e05 = {
  id: "01a18858-1d5d-7b34-b86e-5de7b6b83d79",
  type: "page-type/episode",
  slug: "the-sarah-jane-adventures-s03e05",
  description:
    "The Doctor returns on the happiest day of Sarah Jane's life, but a deadly trap is waiting for them all.",
  ownLength: 30,
  ownProgress: 0,
  partOfCollections: ["season/the-sarah-jane-adventures-season-3"],
  position: 5,
  publishedAt: "2009-10-29",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "12007",
      externalLink: "https://www.themoviedb.org/tv/203/season/3/episode/5",
    },
  ],
  title: "The Wedding of Sarah Jane Smith (1)",
  episodeType: "standard",
  stillPath: "/lVP57pM73YSIcgfXmLyMvTcPAQf.jpg",
  voteAverage: 9.2,
  createdAt: "2026-10-29T15:47:18.491Z",
  updatedAt: "2026-10-29T15:47:18.491Z",
} as const satisfies Episode
