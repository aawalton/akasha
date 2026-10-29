import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekVoyagerS03e15 = {
  id: "01a18853-ac8c-7514-843e-673fd2398976",
  type: "page-type/episode",
  slug: "star-trek-voyager-s03e15",
  description:
    "Stardate: 50518.6. Captain Janeway and Chakotay are trapped in a time loop, reliving the same disastrous shuttle crash.",
  ownLength: 46,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-voyager-season-3"],
  position: 15,
  publishedAt: "1997-01-29",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "113131",
      externalLink: "https://www.themoviedb.org/tv/1855/season/3/episode/15",
    },
  ],
  title: "Coda",
  episodeType: "standard",
  stillPath: "/Gl0NHfvmaQ7JXbCaPqRWE693km.jpg",
  voteAverage: 6.7,
  createdAt: "2026-10-29T15:42:27.464Z",
  updatedAt: "2026-10-29T15:42:27.464Z",
} as const satisfies Episode
