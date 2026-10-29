import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekVoyagerS07e18 = {
  id: "01a18853-ac92-7511-8764-cf91f4c89764",
  type: "page-type/episode",
  slug: "star-trek-voyager-s07e18",
  description:
    "Stardate: Unknown - Seven of Nine runs a series of holodeck simulations to explore her untapped emotions.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-voyager-season-7"],
  position: 18,
  publishedAt: "2001-03-07",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4466844",
      externalLink: "https://www.themoviedb.org/tv/1855/season/7/episode/18",
    },
  ],
  title: "Human Error",
  episodeType: "standard",
  stillPath: "/cOq1gbUv8CkyeBLD3Kpvj9VREpz.jpg",
  voteAverage: 7.1,
  createdAt: "2026-10-29T15:42:27.464Z",
  updatedAt: "2026-10-29T15:42:27.464Z",
} as const satisfies Episode
