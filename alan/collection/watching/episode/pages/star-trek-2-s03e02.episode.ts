import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrek2S03e02 = {
  id: "01a1887f-e189-7f58-9324-3f63de264752",
  type: "page-type/episode",
  slug: "star-trek-2-s03e02",
  description:
    "The crew of the Enterprise are on a secret mission to steal a Romulan cloaking device.",
  ownLength: 51,
  ownProgress: 51,
  partOfCollections: ["season/star-trek-season-3"],
  position: 2,
  publishedAt: "1968-09-27",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "14016",
      externalLink: "https://www.themoviedb.org/tv/253/season/3/episode/2",
    },
  ],
  title: "The Enterprise Incident",
  episodeType: "standard",
  stillPath: "/hfIR5PFLfcPgwVgm8cjYb10223V.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-29T16:30:44.613Z",
  updatedAt: "2026-10-29T16:30:44.613Z",
} as const satisfies Episode
