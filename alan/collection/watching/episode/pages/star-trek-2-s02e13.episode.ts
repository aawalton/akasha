import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrek2S02e13 = {
  id: "01a1887f-e188-73f4-87d3-5594ce801a9f",
  type: "page-type/episode",
  slug: "star-trek-2-s02e13",
  description:
    "Captain James T. Kirk becomes obsessed with destroying a deadly entity he once encountered in his youth.",
  ownLength: 50,
  ownProgress: 50,
  partOfCollections: ["season/star-trek-season-2"],
  position: 13,
  publishedAt: "1967-12-15",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "14002",
      externalLink: "https://www.themoviedb.org/tv/253/season/2/episode/13",
    },
  ],
  title: "Obsession",
  episodeType: "standard",
  stillPath: "/hPDucI3NxTdtbX6uxU9i8vXwKuF.jpg",
  voteAverage: 7,
  createdAt: "2026-10-29T16:30:44.613Z",
  updatedAt: "2026-10-29T16:30:44.613Z",
} as const satisfies Episode
