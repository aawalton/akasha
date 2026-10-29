import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekVoyagerS06e24 = {
  id: "01a18853-ac91-74fb-897e-4d1953ccd877",
  type: "page-type/episode",
  slug: "star-trek-voyager-s06e24",
  description:
    "Stardate: Unknown. News reaches Voyager through the up-and-running Pathfinder project that the Doctor's creator, Lewis Zimmerman, is critically ill. In an attempt to save his life, the Doctor's program is transmitted to the Alpha Quadrant, but once there, he finds Zimmerman does not want to be examined by an 'obsolete' EMH program.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-voyager-season-6"],
  position: 24,
  publishedAt: "2000-05-10",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "113360",
      externalLink: "https://www.themoviedb.org/tv/1855/season/6/episode/24",
    },
  ],
  title: "Life Line",
  episodeType: "standard",
  stillPath: "/ikPIZlAiOKJpSAxSidT98E6LKta.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-29T15:42:27.464Z",
  updatedAt: "2026-10-29T15:42:27.464Z",
} as const satisfies Episode
