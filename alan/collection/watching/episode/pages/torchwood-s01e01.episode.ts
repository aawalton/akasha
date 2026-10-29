import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const torchwoodS01e01 = {
  id: "01a18859-3c68-7f33-90bc-5200cf5e0ed7",
  type: "page-type/episode",
  slug: "torchwood-s01e01",
  description:
    'WPC Gwen Cooper is at the scene of a brutal murder, when the "special ops," known only as Torchwood, arrive. After witnessing the group bring the dead man back to life, Gwen goes in pursuit of this mysterious organisation, only to see weirder things than she could ever imagine existed. Soon after, she begins to regret giving in to her curiosity, when she meets Captain Jack Harkness.',
  ownLength: 52,
  ownProgress: 0,
  partOfCollections: ["season/torchwood-season-1"],
  position: 1,
  publishedAt: "2006-10-22",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "21568",
      externalLink: "https://www.themoviedb.org/tv/424/season/1/episode/1",
    },
  ],
  title: "Everything Changes",
  episodeType: "standard",
  stillPath: "/lT5zmhxK0cWZWKDelRKqev7GedL.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-29T15:48:31.976Z",
  updatedAt: "2026-10-29T15:48:31.976Z",
} as const satisfies Episode
