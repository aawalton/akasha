import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const studioCS16e05 = {
  id: "01a18855-c29e-7a5a-aedf-1e591faaf2ec",
  type: "page-type/episode",
  slug: "studio-c-s16e05",
  description: "It's Halloween at Studio C! Tori Pence is zombie-proof. Monsters rob a blood bank.",
  ownLength: 26,
  ownProgress: 0,
  partOfCollections: ["season/studio-c-season-16"],
  position: 5,
  publishedAt: "2022-10-30",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4839038",
      externalLink: "https://www.themoviedb.org/tv/68207/season/16/episode/5",
    },
  ],
  title: "Ha Ha Halloween",
  episodeType: "standard",
  stillPath: "/kXWjUkGWUjnrW1bmGSHjhTkr43r.jpg",
  voteAverage: 0,
  createdAt: "2026-10-29T15:44:44.188Z",
  updatedAt: "2026-10-29T15:44:44.188Z",
} as const satisfies Episode
