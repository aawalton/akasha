import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekVoyagerS07e04 = {
  id: "01a18853-ac92-7203-999b-2a148ebc2c92",
  type: "page-type/episode",
  slug: "star-trek-voyager-s07e04",
  description:
    "Stardate: 54090.4 - An investigation of mysterious attacks on members of the crew uncovers a buried plot involving Tuvok and a Maquis fanatic.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-voyager-season-7"],
  position: 4,
  publishedAt: "2000-10-25",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4466823",
      externalLink: "https://www.themoviedb.org/tv/1855/season/7/episode/4",
    },
  ],
  title: "Repression",
  episodeType: "standard",
  stillPath: "/sJaeicYqNrEn4Q3b6gRnd8IzNwO.jpg",
  voteAverage: 6.9,
  createdAt: "2026-10-29T15:42:27.464Z",
  updatedAt: "2026-10-29T15:42:27.464Z",
} as const satisfies Episode
