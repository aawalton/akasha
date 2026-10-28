import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const freeSeason1 = {
  id: "01a183d7-ce6d-7308-b9da-f0591ac4ee2f",
  type: "page-type/season",
  slug: "free-season-1",
  description:
    "Four boys named Haruka, Makoto, Nagisa and Rin all participated in a swimming tournament shortly before graduating elementary school and later parted ways. Years later, they reunite when Rin challenges Haruka to a race and wins. Not wanting to be defeated so easily, Haruka gathers Makoto and Nagisa and a new recruit named Rei to form the Iwatobi High School Swimming Club.",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show/free"],
  position: 1,
  publishedAt: "2013-07-04",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "62942",
      externalLink: "https://www.themoviedb.org/tv/61456/season/1",
    },
  ],
  title: "Free! Iwatobi Swim Club",
  posterPath: "/fCLnvknobNsz9LF850UO2XE64AI.jpg",
  voteAverage: 5.8,
  createdAt: "2026-10-28T18:48:40.810Z",
  updatedAt: "2026-10-28T18:48:40.810Z",
} as const satisfies Season
