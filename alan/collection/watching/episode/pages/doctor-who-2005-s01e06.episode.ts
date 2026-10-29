import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const doctorWho2005S01e06 = {
  id: "01a18883-f213-7564-890d-115a654309ef",
  type: "page-type/episode",
  slug: "doctor-who-2005-s01e06",
  description:
    "The Doctor is shattered and Earth is in danger as he and Rose discover the Time Lords' deadliest enemy beneath Utah.",
  ownLength: 48,
  ownProgress: 48,
  partOfCollections: ["season/doctor-who-season-1"],
  position: 6,
  publishedAt: "2005-04-30",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "968595",
      externalLink: "https://www.themoviedb.org/tv/57243/season/1/episode/6",
    },
  ],
  title: "Dalek",
  episodeType: "standard",
  stillPath: "/ijo4TGwFjk8x0ZrU2fg5OVYFEbx.jpg",
  voteAverage: 8.4,
  createdAt: "2026-10-29T16:35:10.995Z",
  updatedAt: "2026-10-29T16:35:10.995Z",
} as const satisfies Episode
