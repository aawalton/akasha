import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const daredevilS02e03 = {
  id: "01a18845-e1fa-700f-b748-f66339e20a73",
  type: "page-type/episode",
  slug: "daredevil-s02e03",
  description: "Matt Murdock and Karen Page find new allies.",
  ownLength: 50,
  ownProgress: 0,
  partOfCollections: ["season/marvel-s-daredevil-season-2"],
  position: 3,
  publishedAt: "2026-03-31",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "6825659",
      externalLink: "https://www.themoviedb.org/tv/202555/season/2/episode/3",
    },
  ],
  title: "The Scales & the Sword",
  episodeType: "standard",
  stillPath: "/vdlYtcgS1x3JURs39cxDD8MtT65.jpg",
  voteAverage: 7.6,
  createdAt: "2026-10-29T15:27:23.641Z",
  updatedAt: "2026-10-29T15:27:23.641Z",
} as const satisfies Episode
