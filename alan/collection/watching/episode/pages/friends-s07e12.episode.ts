import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const friendsS07e12 = {
  id: "01a18848-c2c3-754d-8996-1be5a1849bf9",
  type: "page-type/episode",
  slug: "friends-s07e12",
  description:
    "After the gang head up to the roof to see a passing comet, separate events unfold that lead to them all having a sleepless night.",
  ownLength: 22,
  ownProgress: 0,
  partOfCollections: ["season/friends-season-7"],
  position: 12,
  publishedAt: "2001-01-11",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "87039",
      externalLink: "https://www.themoviedb.org/tv/1668/season/7/episode/12",
    },
  ],
  title: "The One Where They're Up All Night",
  episodeType: "standard",
  stillPath: "/q1lnv5Nar6WIxbrQo5cV7P8YAeU.jpg",
  voteAverage: 8.2,
  createdAt: "2026-10-29T15:30:32.248Z",
  updatedAt: "2026-10-29T15:30:32.248Z",
} as const satisfies Episode
