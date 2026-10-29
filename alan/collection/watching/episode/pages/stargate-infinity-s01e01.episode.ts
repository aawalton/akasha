import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const stargateInfinityS01e01 = {
  id: "01a18854-9bee-7b07-b571-2d2dc4d579ac",
  type: "page-type/episode",
  slug: "stargate-infinity-s01e01",
  description:
    "A group of trainees and their leader, veteran gate traveller Gus Bonner, must help an alien named Draga, who is being pursued by both alien forces and bounty hunters from Earth, get back to her homeworld.",
  ownLength: 21,
  ownProgress: 0,
  partOfCollections: ["season/stargate-infinity-season-1"],
  position: 1,
  publishedAt: "2002-09-14",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "198887",
      externalLink: "https://www.themoviedb.org/tv/2580/season/1/episode/1",
    },
  ],
  title: "Decision",
  episodeType: "standard",
  stillPath: "/6xVhU5tQqXqibZiiOdOC9vWwDdc.jpg",
  voteAverage: 4,
  createdAt: "2026-10-29T15:43:28.750Z",
  updatedAt: "2026-10-29T15:43:28.750Z",
} as const satisfies Episode
