import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const whiteCollarS04e13 = {
  id: "01a18881-51a2-7428-99b0-2bb679e83d52",
  type: "page-type/episode",
  slug: "white-collar-s04e13",
  description:
    "Peter and Neal work a forgery and money laundering case that leads them into two of the most iconic New York institutions, taxi cabs and jazz.",
  ownLength: 44,
  ownProgress: 44,
  partOfCollections: ["season/white-collar-season-4"],
  position: 13,
  publishedAt: "2013-02-05",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "596304",
      externalLink: "https://www.themoviedb.org/tv/21510/season/4/episode/13",
    },
  ],
  title: "Empire City",
  episodeType: "standard",
  stillPath: "/cShPynJguouzbI96VuQNK5juzTA.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-29T16:32:18.847Z",
  updatedAt: "2026-10-29T16:32:18.847Z",
} as const satisfies Episode
