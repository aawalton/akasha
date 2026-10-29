import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const andorS01e07 = {
  id: "01a18843-186f-7e08-bf2f-d554db57807d",
  type: "page-type/episode",
  slug: "andor-s01e07",
  description:
    "The repercussions of the Aldhani heist reach all the way to Coruscant, while Cassian returns home.",
  ownLength: 53,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-andor-season-1"],
  position: 7,
  publishedAt: "2022-10-19",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "3745387",
      externalLink: "https://www.themoviedb.org/tv/83867/season/1/episode/7",
    },
  ],
  title: "Announcement",
  episodeType: "standard",
  stillPath: "/dxeAAAOIAIRrck62CksEmgQOXiS.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-29T15:24:20.975Z",
  updatedAt: "2026-10-29T15:24:20.975Z",
} as const satisfies Episode
