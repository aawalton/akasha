import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theOfficeS06e06 = {
  id: "01a18857-c36b-70f1-b15a-a95e95851505",
  type: "page-type/episode",
  slug: "the-office-s06e06",
  description:
    "Jim and Pam return from their honeymoon and discover that Michael is dating Pam's mother, which infuriates her. Meanwhile, Dwight tries to install a recording device in Jim's office, by giving him a wooden mallard as an apology for their long rivalry.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/the-office-season-6"],
  position: 6,
  publishedAt: "2009-10-22",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "170202",
      externalLink: "https://www.themoviedb.org/tv/2316/season/6/episode/6",
    },
  ],
  title: "The Lover",
  episodeType: "standard",
  stillPath: "/7gem2WvuueQCSZToxHrCAJ3wne1.jpg",
  voteAverage: 7.7,
  createdAt: "2026-10-29T15:46:55.461Z",
  updatedAt: "2026-10-29T15:46:55.461Z",
} as const satisfies Episode
