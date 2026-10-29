import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const criminalMindsS11e01 = {
  id: "01a18844-d7f4-7087-ad11-5cfaf6988fa1",
  type: "page-type/episode",
  slug: "criminal-minds-s11e01",
  description:
    "The BAU is interviewing different candidates to join their ranks in the wake of Kate’s departure, including a forensic psychologist, Dr. Tara Lewis, who is eager to assist their efforts. Also, the BAU hunts for a serial killer who leaves behind distinctive evidence that points to someone intent on revenge.",
  ownLength: 42,
  ownProgress: 0,
  partOfCollections: ["season/criminal-minds-season-11"],
  position: 1,
  publishedAt: "2015-09-30",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1106596",
      externalLink: "https://www.themoviedb.org/tv/4057/season/11/episode/1",
    },
  ],
  title: "The Job",
  episodeType: "standard",
  stillPath: "/lhcXuprZz7ZUL1fH4HS4ZFWoWEP.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-29T15:26:15.527Z",
  updatedAt: "2026-10-29T15:26:15.527Z",
} as const satisfies Episode
