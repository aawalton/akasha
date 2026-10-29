import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrek2S02e23 = {
  id: "01a1887f-e189-71e2-9134-843f9ba83b5e",
  type: "page-type/episode",
  slug: "star-trek-2-s02e23",
  description:
    "Captain Kirk must find the cure to a deadly disease and put an end to another Starfleet captain's cultural interference.",
  ownLength: 50,
  ownProgress: 50,
  partOfCollections: ["season/star-trek-season-2"],
  position: 23,
  publishedAt: "1968-03-01",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "14008",
      externalLink: "https://www.themoviedb.org/tv/253/season/2/episode/23",
    },
  ],
  title: "The Omega Glory",
  episodeType: "standard",
  stillPath: "/3Prvurof3KSUFeYY1xJriMWM3ho.jpg",
  voteAverage: 6.3,
  createdAt: "2026-10-29T16:30:44.613Z",
  updatedAt: "2026-10-29T16:30:44.613Z",
} as const satisfies Episode
