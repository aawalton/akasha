import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const sherlockS02e02 = {
  id: "01a1887f-adf0-73ba-a86a-8c75a80135d9",
  type: "page-type/episode",
  slug: "sherlock-s02e02",
  description:
    "A hound from hell. Sherlock's most famous case. But is a monster really stalking Dartmoor?",
  ownLength: 89,
  ownProgress: 89,
  partOfCollections: ["season/sherlock-season-2"],
  position: 2,
  publishedAt: "2012-01-08",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "578719",
      externalLink: "https://www.themoviedb.org/tv/19885/season/2/episode/2",
    },
  ],
  title: "The Hounds of Baskerville",
  episodeType: "standard",
  stillPath: "/vjUsJUsF5RcTRKn2prGHCW9Nxro.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-29T16:30:31.407Z",
  updatedAt: "2026-10-29T16:30:31.407Z",
} as const satisfies Episode
