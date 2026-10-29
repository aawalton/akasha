import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrek2S01e01 = {
  id: "01a1887f-e185-7e53-a577-66d1082d97ee",
  type: "page-type/episode",
  slug: "star-trek-2-s01e01",
  description:
    "Doctor Leonard “Bones” McCoy meets a former girlfriend when the enterprise brings supplies to a remote archaeological survey group. Still attractive to McCoy, the woman's current appearance hides a dark and deadly secret.",
  ownLength: 50,
  ownProgress: 50,
  partOfCollections: ["season/star-trek-season-1"],
  position: 1,
  publishedAt: "1966-09-08",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "13955",
      externalLink: "https://www.themoviedb.org/tv/253/season/1/episode/1",
    },
  ],
  title: "The Man Trap",
  episodeType: "standard",
  stillPath: "/aF3Jj40Fs8ZUhPVmuP8aPkXQA3Q.jpg",
  voteAverage: 7,
  createdAt: "2026-10-29T16:30:44.613Z",
  updatedAt: "2026-10-29T16:30:44.613Z",
} as const satisfies Episode
