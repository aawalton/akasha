import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const studioCS03e10 = {
  id: "01a18885-00fa-7a02-bcd7-309a49e16c7c",
  type: "page-type/episode",
  slug: "studio-c-s03e10",
  description:
    "Santa learns new ways to show his love at Christmas, and Kyle's mom takes him to the mall.",
  ownLength: 26,
  ownProgress: 26,
  partOfCollections: ["season/studio-c-season-3"],
  position: 10,
  publishedAt: "2013-12-09",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "5580152",
      externalLink: "https://www.themoviedb.org/tv/68207/season/3/episode/10",
    },
  ],
  title: "Season 3 Christmas Special",
  episodeType: "standard",
  stillPath: "/vHukwFL5IOSkpZ1dFs4mtYkbpcj.jpg",
  voteAverage: 0,
  createdAt: "2026-10-29T16:36:20.344Z",
  updatedAt: "2026-10-29T16:36:20.344Z",
} as const satisfies Episode
