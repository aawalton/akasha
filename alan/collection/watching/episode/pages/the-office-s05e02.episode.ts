import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theOfficeS05e02 = {
  id: "01a18857-c369-770d-a437-c5f07116e44e",
  type: "page-type/episode",
  slug: "the-office-s05e02",
  description:
    'Holly leads a business ethics seminar as a result of Ryan\'s scandal, and when Michael encourages everyone to share their own unethical work behaviors, things get out of hand. Meanwhile, Jim messes with Dwight by requiring him to follow the Dunder Mifflin "Time Theft" policy.',
  ownLength: 22,
  ownProgress: 0,
  partOfCollections: ["season/the-office-season-5"],
  position: 2,
  publishedAt: "2008-10-09",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "170231",
      externalLink: "https://www.themoviedb.org/tv/2316/season/5/episode/2",
    },
  ],
  title: "Business Ethics",
  episodeType: "standard",
  stillPath: "/uHFPX3pK2jtcViZLED1esrKUZvj.jpg",
  voteAverage: 8.1,
  createdAt: "2026-10-29T15:46:55.461Z",
  updatedAt: "2026-10-29T15:46:55.461Z",
} as const satisfies Episode
