import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theOfficeS05e07 = {
  id: "01a18857-c369-7a26-88d6-d75aea8b5e5e",
  type: "page-type/episode",
  slug: "the-office-s05e07",
  description:
    "Michael is thrilled when he learns that David Wallace is sending him to Canada for a business trip, and wants to bring both Andy and Oscar with him. Jim misses Pam and he can't wait until she returns from art school.",
  ownLength: 22,
  ownProgress: 0,
  partOfCollections: ["season/the-office-season-5"],
  position: 7,
  publishedAt: "2008-11-13",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "170213",
      externalLink: "https://www.themoviedb.org/tv/2316/season/5/episode/7",
    },
  ],
  title: "Business Trip",
  episodeType: "standard",
  stillPath: "/KHAsjYxWqAvKsPh8OeS0diEwCi.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-29T15:46:55.461Z",
  updatedAt: "2026-10-29T15:46:55.461Z",
} as const satisfies Episode
