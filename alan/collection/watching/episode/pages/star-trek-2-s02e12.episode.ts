import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrek2S02e12 = {
  id: "01a1887f-e188-7b16-a9d3-b8b4f777fe4a",
  type: "page-type/episode",
  slug: "star-trek-2-s02e12",
  description:
    "Strange radiation exposes the command crew of the Enterprise to the effects of rapid aging.",
  ownLength: 50,
  ownProgress: 50,
  partOfCollections: ["season/star-trek-season-2"],
  position: 12,
  publishedAt: "1967-12-08",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "13999",
      externalLink: "https://www.themoviedb.org/tv/253/season/2/episode/12",
    },
  ],
  title: "The Deadly Years",
  episodeType: "standard",
  stillPath: "/vrypvTSBRpDQkXMu7XqrA6UNSIE.jpg",
  voteAverage: 7.4,
  createdAt: "2026-10-29T16:30:44.613Z",
  updatedAt: "2026-10-29T16:30:44.613Z",
} as const satisfies Episode
