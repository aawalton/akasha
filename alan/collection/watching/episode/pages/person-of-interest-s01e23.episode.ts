import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const personOfInterestS01e23 = {
  id: "01a18851-3df3-739f-9aad-2be37ca0fb98",
  type: "page-type/episode",
  slug: "person-of-interest-s01e23",
  description:
    "As the clock ticks down, Reese winds up trapped with his POI in the most heavily surveilled part of the city, forced to rely on the help of Finch, Carter and Fusco to fend off the FBI, corrupt cops and a slew of old foes.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/person-of-interest-season-1"],
  position: 23,
  publishedAt: "2012-05-17",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "64077",
      externalLink: "https://www.themoviedb.org/tv/1411/season/1/episode/23",
    },
  ],
  title: "Firewall",
  episodeType: "finale",
  stillPath: "/4Sqd6gKoIA58ry0o2a1SvzUnjiQ.jpg",
  voteAverage: 9.1,
  createdAt: "2026-10-29T15:39:48.082Z",
  updatedAt: "2026-10-29T15:39:48.082Z",
} as const satisfies Episode
