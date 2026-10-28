import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const myHeroAcademiaS03e21 = {
  id: "01a183d4-acc5-76ff-8a21-4e030fcec95a",
  type: "page-type/episode",
  slug: "my-hero-academia-s03e21",
  description:
    "The exam nears its end, but Izuku and the other hero candidates must fend off Gang Orca to finish the rescue mission.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/my-hero-academia-season-3"],
  position: 21,
  publishedAt: "2018-09-01",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1557754",
      externalLink: "https://www.themoviedb.org/tv/65930/season/3/episode/21",
    },
  ],
  title: "What’s the Big Idea?",
  episodeType: "standard",
  stillPath: "/6MSrGMZMZ6zILXEMqGgHrD9JttC.jpg",
  voteAverage: 8.4,
  createdAt: "2026-10-28T18:45:15.586Z",
  updatedAt: "2026-10-28T18:45:15.586Z",
} as const satisfies Episode
