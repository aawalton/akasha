import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const personOfInterestS05e12 = {
  id: "01a18851-3df8-7f3a-af06-b29f931ffca8",
  type: "page-type/episode",
  slug: "person-of-interest-s05e12",
  description:
    "As Reese and Shaw race to catch up with Finch, he infiltrates a maximum-security government facility in a desperate mission which could mean the end for not only Samaritan, but for himself and The Machine as well.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/person-of-interest-season-5"],
  position: 12,
  publishedAt: "2016-06-14",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1176508",
      externalLink: "https://www.themoviedb.org/tv/1411/season/5/episode/12",
    },
  ],
  title: ".exe",
  episodeType: "standard",
  stillPath: "/qYR2qDyDvgPVPX2W0nIIccIoyxP.jpg",
  voteAverage: 8.7,
  createdAt: "2026-10-29T15:39:48.082Z",
  updatedAt: "2026-10-29T15:39:48.082Z",
} as const satisfies Episode
