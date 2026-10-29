import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theMentalistS01e18 = {
  id: "01a18880-75e5-7862-bf59-fcd7499040ba",
  type: "page-type/episode",
  slug: "the-mentalist-s01e18",
  description:
    "Patrick Jane and the CBI team track down a mastermind who hypnotizes people into doing their bidding.",
  ownLength: 43,
  ownProgress: 43,
  partOfCollections: ["season/the-mentalist-season-1"],
  position: 18,
  publishedAt: "2009-03-31",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "367706",
      externalLink: "https://www.themoviedb.org/tv/5920/season/1/episode/18",
    },
  ],
  title: "Russet Potatoes",
  episodeType: "standard",
  stillPath: "/3W680u2hpzQKRIADH9Ayio2N3My.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T16:31:22.596Z",
  updatedAt: "2026-10-29T16:31:22.596Z",
} as const satisfies Episode
