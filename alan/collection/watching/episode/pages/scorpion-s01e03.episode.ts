import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const scorpionS01e03 = {
  id: "01a1887f-56d1-72a9-acf4-15c9fe9013da",
  type: "page-type/episode",
  slug: "scorpion-s01e03",
  description:
    "After failing a military training mission, the team members are determined to prove themselves when an Internet infrastructure is threatened by a bomber.",
  ownLength: 42,
  ownProgress: 42,
  partOfCollections: ["season/scorpion-season-1"],
  position: 3,
  publishedAt: "2014-10-06",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1010134",
      externalLink: "https://www.themoviedb.org/tv/60797/season/1/episode/3",
    },
  ],
  title: "A Cyclone",
  episodeType: "standard",
  stillPath: "/zRYBqqJVMkWc8bN7qMJ5tr3gELm.jpg",
  voteAverage: 6.8,
  createdAt: "2026-10-29T16:30:09.105Z",
  updatedAt: "2026-10-29T16:30:09.105Z",
} as const satisfies Episode
