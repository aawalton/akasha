import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const criminalMindsS01e04 = {
  id: "01a18883-a8ae-7686-a4e0-1850c3b8c598",
  type: "page-type/episode",
  slug: "criminal-minds-s01e04",
  description:
    "The BAU team travels to San Diego to stop a rapist and murderer who commits his crimes in the middle of the day.",
  ownLength: 40,
  ownProgress: 40,
  partOfCollections: ["season/criminal-minds-season-1"],
  position: 4,
  publishedAt: "2005-10-12",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "282871",
      externalLink: "https://www.themoviedb.org/tv/4057/season/1/episode/4",
    },
  ],
  title: "Plain Sight",
  episodeType: "standard",
  stillPath: "/3dJupZnJEsl3r3uuHRKAkSjw8vP.jpg",
  voteAverage: 7.6,
  createdAt: "2026-10-29T16:34:52.205Z",
  updatedAt: "2026-10-29T16:34:52.205Z",
} as const satisfies Episode
