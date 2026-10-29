import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const doctorWho2005S01e01 = {
  id: "01a18883-f213-775c-83c6-daaa8d318af9",
  type: "page-type/episode",
  slug: "doctor-who-2005-s01e01",
  description:
    "Rose Tyler meets a mysterious stranger called the Doctor, and realises Earth is in danger.",
  ownLength: 47,
  ownProgress: 47,
  partOfCollections: ["season/doctor-who-season-1"],
  position: 1,
  publishedAt: "2005-03-26",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "941474",
      externalLink: "https://www.themoviedb.org/tv/57243/season/1/episode/1",
    },
  ],
  title: "Rose",
  episodeType: "standard",
  stillPath: "/dZNrYgOvt5M6oPAcMf5HH103E05.jpg",
  voteAverage: 7.3,
  createdAt: "2026-10-29T16:35:10.995Z",
  updatedAt: "2026-10-29T16:35:10.995Z",
} as const satisfies Episode
