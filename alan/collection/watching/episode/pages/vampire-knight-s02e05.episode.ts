import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const vampireKnightS02e05 = {
  id: "01a183d8-f258-7803-9037-900636e9f1e2",
  type: "page-type/episode",
  slug: "vampire-knight-s02e05",
  description:
    "Yuki is continually haunted by visions of blood. Nevertheless, she is determined to find out about her past from Kaname.",
  ownLength: 30,
  ownProgress: 0,
  partOfCollections: ["season/vampire-knight-season-2"],
  position: 5,
  publishedAt: "2008-11-04",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "553040",
      externalLink: "https://www.themoviedb.org/tv/17149/season/2/episode/5",
    },
  ],
  title: "The Subordinate's Trap",
  episodeType: "standard",
  stillPath: "/wS7wMUmHWtgxLpFKvrIO8QNeU1u.jpg",
  voteAverage: 8,
  createdAt: "2026-10-28T18:49:55.542Z",
  updatedAt: "2026-10-28T18:49:55.542Z",
} as const satisfies Episode
