import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const friendsS03e12 = {
  id: "01a18848-c2bc-7b6e-826a-8012db2178a1",
  type: "page-type/episode",
  slug: "friends-s03e12",
  description:
    "Ross becomes increasingly jealous of Rachel's new colleague, Mark, and spies on her. Monica hooks up with a co-worker, who writes her a poem with a hidden meaning. One of Joey's numerous lies on his resume is exposed when he takes part in a Broadway musical.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/friends-season-3"],
  position: 12,
  publishedAt: "1997-01-16",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "86349",
      externalLink: "https://www.themoviedb.org/tv/1668/season/3/episode/12",
    },
  ],
  title: "The One with All the Jealousy",
  episodeType: "standard",
  stillPath: "/yz9hYNhS92EFfii4apZoPaH3TxZ.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-29T15:30:32.248Z",
  updatedAt: "2026-10-29T15:30:32.248Z",
} as const satisfies Episode
