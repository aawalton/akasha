import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const doctorWho2005S10e01 = {
  id: "01a18883-f219-7f50-9134-73f30f162d7b",
  type: "page-type/episode",
  slug: "doctor-who-2005-s10e01",
  description:
    "Two worlds collide when the Doctor meets Bill. A chance encounter with a girl with a star in her eye leads to a terrifying chase across time and space. Bill’s mind is opened to a universe that is bigger and more exciting than she could possibly have imagined – but who is the Doctor, and what is his secret mission with Nardole on Earth?",
  ownLength: 50,
  ownProgress: 50,
  partOfCollections: ["season/doctor-who-season-10"],
  position: 1,
  publishedAt: "2017-04-15",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1231112",
      externalLink: "https://www.themoviedb.org/tv/57243/season/10/episode/1",
    },
  ],
  title: "The Pilot",
  episodeType: "standard",
  stillPath: "/egN8BjxH7umTP73Gkjj2HiVZSpw.jpg",
  voteAverage: 7.1,
  createdAt: "2026-10-29T16:35:10.995Z",
  updatedAt: "2026-10-29T16:35:10.995Z",
} as const satisfies Episode
