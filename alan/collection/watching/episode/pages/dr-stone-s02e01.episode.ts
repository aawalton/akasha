import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const drStoneS02e01 = {
  id: "01a183d9-8fc0-7a6d-a841-3b957e848f74",
  type: "page-type/episode",
  slug: "dr-stone-s02e01",
  description:
    'Senku continues in trying to advance the Stone World, this time he makes "space food", it is in actuality cup noodles. After Senku finishes his project, Gen has an epiphany and devises a plan to take down Tsukasa\'s army without violence.',
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/dr-stone-season-2"],
  position: 1,
  publishedAt: "2021-01-14",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2547319",
      externalLink: "https://www.themoviedb.org/tv/86031/season/2/episode/1",
    },
  ],
  title: "Stone Wars Beginning",
  episodeType: "standard",
  stillPath: "/cW1XaeCWJya4PIgoDjijM2Qk3Vc.jpg",
  voteAverage: 7.1,
  createdAt: "2026-10-28T18:50:35.838Z",
  updatedAt: "2026-10-28T18:50:35.838Z",
} as const satisfies Episode
