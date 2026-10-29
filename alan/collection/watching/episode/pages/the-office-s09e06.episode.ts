import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theOfficeS09e06 = {
  id: "01a18857-c36e-7ecc-8363-09bdf27f0970",
  type: "page-type/episode",
  slug: "the-office-s09e06",
  description:
    "Money problems plague Andy's family. Meanwhile, Dwight guests on a local radio show, so the staffers harass him with outrageous phone calls, and Kevin unearths a big secret about Oscar.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/the-office-season-9"],
  position: 6,
  publishedAt: "2012-11-08",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "170319",
      externalLink: "https://www.themoviedb.org/tv/2316/season/9/episode/6",
    },
  ],
  title: "The Boat",
  episodeType: "standard",
  stillPath: "/1h3xA3zrcy2OVqPBY7tR3qgML2z.jpg",
  voteAverage: 7,
  createdAt: "2026-10-29T15:46:55.461Z",
  updatedAt: "2026-10-29T15:46:55.461Z",
} as const satisfies Episode
