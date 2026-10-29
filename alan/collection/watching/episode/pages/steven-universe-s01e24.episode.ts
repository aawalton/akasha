import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const stevenUniverseS01e24 = {
  id: "01a18855-67e5-7dc3-95be-68273a068027",
  type: "page-type/episode",
  slug: "steven-universe-s01e24",
  description:
    "Steven tells Connie about his mission with the Gems to heal Amethyst after she cracks her gemstone.",
  ownLength: 12,
  ownProgress: 0,
  partOfCollections: ["season/steven-universe-season-1"],
  position: 24,
  publishedAt: "2014-09-18",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1007390",
      externalLink: "https://www.themoviedb.org/tv/61175/season/1/episode/24",
    },
  ],
  title: "An Indirect Kiss",
  episodeType: "standard",
  stillPath: "/mgU92XHGC8MhJwsxlw6P9Tmx7kx.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-29T15:44:20.963Z",
  updatedAt: "2026-10-29T15:44:20.963Z",
} as const satisfies Episode
