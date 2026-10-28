import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const narutoS04e209 = {
  id: "01a183d1-bb60-7a8e-a044-5e5098c1b565",
  type: "page-type/episode",
  slug: "naruto-s04e209",
  description:
    "Naruto, Sakura and Lee are sent to escort a prisoner named Gantetsu to the Forest Country Capital. Their job is only to back up the escort group incase something goes wrong, which inevitably, it does....",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/naruto-season-4"],
  position: 209,
  publishedAt: "2006-11-09",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1161626",
      externalLink: "https://www.themoviedb.org/tv/46260/season/4/episode/209",
    },
  ],
  title: "The Enemy: Ninja Dropouts",
  episodeType: "standard",
  stillPath: "/sNe7jsPZOQQ5NMj2QZy78l7AN4u.jpg",
  voteAverage: 6.6,
  createdAt: "2026-10-28T18:42:02.697Z",
  updatedAt: "2026-10-28T18:42:02.697Z",
} as const satisfies Episode
