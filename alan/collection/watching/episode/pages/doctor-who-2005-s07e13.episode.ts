import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const doctorWho2005S07e13 = {
  id: "01a18883-f218-7b74-8695-1fcee0ee6720",
  type: "page-type/episode",
  slug: "doctor-who-2005-s07e13",
  description:
    "Someone is kidnapping the Doctor's friends, leading him towards the one place in all of time and space that he should never go.",
  ownLength: 45,
  ownProgress: 45,
  partOfCollections: ["season/doctor-who-season-7"],
  position: 13,
  publishedAt: "2013-05-18",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "968609",
      externalLink: "https://www.themoviedb.org/tv/57243/season/7/episode/13",
    },
  ],
  title: "The Name of the Doctor",
  episodeType: "standard",
  stillPath: "/rstZ7dB8vuw0hcvEDHtYOtE59Uf.jpg",
  voteAverage: 8.2,
  createdAt: "2026-10-29T16:35:10.995Z",
  updatedAt: "2026-10-29T16:35:10.995Z",
} as const satisfies Episode
