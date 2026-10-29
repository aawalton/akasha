import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrek2S02e19 = {
  id: "01a1887f-e189-75b0-9462-7a01a0ee26f6",
  type: "page-type/episode",
  slug: "star-trek-2-s02e19",
  description:
    "The crew of the Enterprise discovers Klingon interference in the development of a formerly peaceful planet and is forced to help maintain a balance of power.",
  ownLength: 51,
  ownProgress: 51,
  partOfCollections: ["season/star-trek-season-2"],
  position: 19,
  publishedAt: "1968-02-02",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "14000",
      externalLink: "https://www.themoviedb.org/tv/253/season/2/episode/19",
    },
  ],
  title: "A Private Little War",
  episodeType: "standard",
  stillPath: "/s0mmSEqiuzQcrVe49Fc7SU1MvJB.jpg",
  voteAverage: 7,
  createdAt: "2026-10-29T16:30:44.613Z",
  updatedAt: "2026-10-29T16:30:44.613Z",
} as const satisfies Episode
