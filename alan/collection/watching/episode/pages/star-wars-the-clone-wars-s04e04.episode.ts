import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starWarsTheCloneWarsS04e04 = {
  id: "01a18854-50ab-7901-8bf2-1449c31be252",
  type: "page-type/episode",
  slug: "star-wars-the-clone-wars-s04e04",
  description:
    "When the leader of the Gungans, Boss Lyonie, is injured it's discovered there is an uncanny resemblance between the Boss and Jar Jar Binks. Binks must sway his people from rising against the Naboo and stopping a Separatist invasion led by General Grievous.",
  ownLength: 22,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-the-clone-wars-season-4"],
  position: 4,
  publishedAt: "2011-09-30",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "286670",
      externalLink: "https://www.themoviedb.org/tv/4194/season/4/episode/4",
    },
  ],
  title: "Shadow Warrior",
  episodeType: "standard",
  stillPath: "/sDTdgtOh3vLFm9hYyyG6GYK5R4z.jpg",
  voteAverage: 7.2,
  createdAt: "2026-10-29T15:43:09.479Z",
  updatedAt: "2026-10-29T15:43:09.479Z",
} as const satisfies Episode
