import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const criticalRoleS01e01 = {
  id: "01a18845-77d8-78f6-9c97-d34cfd463f51",
  type: "page-type/episode",
  slug: "critical-role-s01e01",
  description:
    "Vox Machina arrives at the cavernous underground city of Kraghammer intent on rescuing a missing halfling paladin. They sample the culture of the city and find themselves coming face-to-face with the horrors coming from beneath the city...",
  ownLength: 184,
  ownProgress: 0,
  partOfCollections: ["season/campaign-1-vox-machina"],
  position: 1,
  publishedAt: "2015-03-12",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "5335328",
      externalLink: "https://www.themoviedb.org/tv/254002/season/1/episode/1",
    },
  ],
  title: "Arrival at Kraghammer",
  episodeType: "standard",
  stillPath: "/35CXQnX7IRxu2QxcvoqX6ETwqKN.jpg",
  voteAverage: 0,
  createdAt: "2026-10-29T15:26:56.472Z",
  updatedAt: "2026-10-29T15:26:56.472Z",
} as const satisfies Episode
