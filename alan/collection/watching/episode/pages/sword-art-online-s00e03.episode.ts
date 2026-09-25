import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const swordArtOnlineS00e03 = {
  id: "019ea442-69c8-755a-9035-b337fd61e369",
  type: "page-type/episode",
  slug: "sword-art-online-s00e03",
  title: "Sword Art Offline 3",
  description:
    "This edition feature the highlights of episodes 6, 7, and 8 with Lisbeth as the special guest.",
  position: 3,
  ownLength: 12,
  unit: "unit/minutes",
  partOfCollections: ["season/sword-art-online-s00"],
  publishedAt: "2012-12-26",
  episodeType: "standard",
  stillPath: "/8BxPzACEGX4KhwHXTVGzXAi25Ri.jpg",
  voteAverage: 6,
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "904460",
      externalLink: "https://www.themoviedb.org/tv/45782/season/0/episode/3",
    },
  ],
} as const satisfies Episode
