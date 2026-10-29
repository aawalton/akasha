import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrek2S02e15 = {
  id: "01a1887f-e189-705e-a9e0-09b2154f757e",
  type: "page-type/episode",
  slug: "star-trek-2-s02e15",
  description:
    "The Enterprise must protect a very important shipment of grain from both Klingons and some adorable creatures called tribbles.",
  ownLength: 50,
  ownProgress: 50,
  partOfCollections: ["season/star-trek-season-2"],
  position: 15,
  publishedAt: "1967-12-29",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "13984",
      externalLink: "https://www.themoviedb.org/tv/253/season/2/episode/15",
    },
  ],
  title: "The Trouble With Tribbles",
  episodeType: "standard",
  stillPath: "/3vOY6Y3DCv7G0hjo6NTRQbql4lE.jpg",
  voteAverage: 8.5,
  createdAt: "2026-10-29T16:30:44.613Z",
  updatedAt: "2026-10-29T16:30:44.613Z",
} as const satisfies Episode
