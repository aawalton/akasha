import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theOfficeS05e10 = {
  id: "01a18857-c369-76be-9095-b80b18008366",
  type: "page-type/episode",
  slug: "the-office-s05e10",
  description:
    "Phyllis' Moroccan-themed holiday party goes up in flames when Meredith's hair catches on fire and Michael is forced to deal with the accident. Meanwhile, Dwight corners the market on the hottest toy of the Christmas season.",
  ownLength: 22,
  ownProgress: 0,
  partOfCollections: ["season/the-office-season-5"],
  position: 10,
  publishedAt: "2008-12-11",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "170216",
      externalLink: "https://www.themoviedb.org/tv/2316/season/5/episode/10",
    },
  ],
  title: "Moroccan Christmas",
  episodeType: "mid-season",
  stillPath: "/2w8SRRHbHiGIf7Uxr56W6oxfftQ.jpg",
  voteAverage: 8.3,
  createdAt: "2026-10-29T15:46:55.461Z",
  updatedAt: "2026-10-29T15:46:55.461Z",
} as const satisfies Episode
