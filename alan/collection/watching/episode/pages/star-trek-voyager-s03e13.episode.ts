import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekVoyagerS03e13 = {
  id: "01a18853-ac8c-7b54-852f-1f02e18e17c3",
  type: "page-type/episode",
  slug: "star-trek-voyager-s03e13",
  description:
    "Stardate: Unknown. Voyager arrives at the dangerous and uncharted Nekrit Expanse. Neelix, feeling useless now that he can’t guide them, reaches out to a shady contact to find the crew a map.",
  ownLength: 46,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-voyager-season-3"],
  position: 13,
  publishedAt: "1997-01-08",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "113125",
      externalLink: "https://www.themoviedb.org/tv/1855/season/3/episode/13",
    },
  ],
  title: "Fair Trade",
  episodeType: "standard",
  stillPath: "/qM8Y1fhTQQ9ys6UktNbZVBKC263.jpg",
  voteAverage: 6.8,
  createdAt: "2026-10-29T15:42:27.464Z",
  updatedAt: "2026-10-29T15:42:27.464Z",
} as const satisfies Episode
