import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrek2S02e22 = {
  id: "01a1887f-e189-7425-86ca-59b399948381",
  type: "page-type/episode",
  slug: "star-trek-2-s02e22",
  description: "Beings from another galaxy commandeer the Enterprise in an attempt to return home.",
  ownLength: 50,
  ownProgress: 50,
  partOfCollections: ["season/star-trek-season-2"],
  position: 22,
  publishedAt: "1968-02-23",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "14004",
      externalLink: "https://www.themoviedb.org/tv/253/season/2/episode/22",
    },
  ],
  title: "By Any Other Name",
  episodeType: "standard",
  stillPath: "/xOnepUj3d5dRJyeipONrUJlF1Ip.jpg",
  voteAverage: 7.5,
  createdAt: "2026-10-29T16:30:44.613Z",
  updatedAt: "2026-10-29T16:30:44.613Z",
} as const satisfies Episode
