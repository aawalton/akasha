import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekVoyagerS06e05 = {
  id: "01a18853-ac90-7de2-8912-6a7c59e39416",
  type: "page-type/episode",
  slug: "star-trek-voyager-s06e05",
  description:
    "Stardate: Unknown. Tom Paris buys a beaten-up old hot-rod of a ship to restore, but B’Ellana begins to worry as Tom grows increasingly obsessed with the ship.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-voyager-season-6"],
  position: 5,
  publishedAt: "1999-10-20",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "113300",
      externalLink: "https://www.themoviedb.org/tv/1855/season/6/episode/5",
    },
  ],
  title: "Alice",
  episodeType: "standard",
  stillPath: "/4JtWwtyO2DKJPiejqJypucyZVIv.jpg",
  voteAverage: 6.1,
  createdAt: "2026-10-29T15:42:27.464Z",
  updatedAt: "2026-10-29T15:42:27.464Z",
} as const satisfies Episode
