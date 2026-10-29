import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const criminalMindsS01e15 = {
  id: "01a18883-a8af-73ae-a387-445ad502c44e",
  type: "page-type/episode",
  slug: "criminal-minds-s01e15",
  description:
    "A serial killer reappears after 20 years of silence and contacts the BAU with the promise he will kill another victim in the next five days.",
  ownLength: 41,
  ownProgress: 41,
  partOfCollections: ["season/criminal-minds-season-1"],
  position: 15,
  publishedAt: "2006-03-01",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "282913",
      externalLink: "https://www.themoviedb.org/tv/4057/season/1/episode/15",
    },
  ],
  title: "Unfinished Business",
  episodeType: "standard",
  stillPath: "/oqi6ckoc4NITmtVRvXq16O6JULo.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-29T16:34:52.205Z",
  updatedAt: "2026-10-29T16:34:52.205Z",
} as const satisfies Episode
