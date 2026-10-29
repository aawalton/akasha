import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const criticalRoleS02e01 = {
  id: "01a18845-77df-7616-a5df-ca3edbc827c4",
  type: "page-type/episode",
  slug: "critical-role-s02e01",
  description:
    "In Wildemount, seven adventurers coalesce in a tavern before finding themselves drawn to a mysterious circus.",
  ownLength: 215,
  ownProgress: 0,
  partOfCollections: ["season/campaign-2-the-mighty-nein"],
  position: 1,
  publishedAt: "2018-01-11",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "5335798",
      externalLink: "https://www.themoviedb.org/tv/254002/season/2/episode/1",
    },
  ],
  title: "Curious Beginnings",
  episodeType: "standard",
  stillPath: "/qiP3Doff5M0MK6I3yrW3MPhSB5s.jpg",
  voteAverage: 0,
  createdAt: "2026-10-29T15:26:56.472Z",
  updatedAt: "2026-10-29T15:26:56.472Z",
} as const satisfies Episode
