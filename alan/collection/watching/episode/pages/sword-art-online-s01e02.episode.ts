import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const swordArtOnlineS01e02 = {
  id: "019ea442-729e-7403-9d15-2d10b81c28b7",
  type: "page-type/episode",
  slug: "sword-art-online-s01e02",
  title: "Beater",
  description:
    "It’s been one month since the players have been locked in the game.  2000 people have died; the first floor hasn’t been cleared yet.",
  position: 2,
  ownLength: 23,
  unit: "unit/minutes",
  partOfCollections: ["season/sword-art-online-s01"],
  publishedAt: "2012-07-15",
  episodeType: "standard",
  stillPath: "/hiBynS5SFi0ltxFsaYtq39C9k76.jpg",
  voteAverage: 8,
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "904436",
      externalLink: "https://www.themoviedb.org/tv/45782/season/1/episode/2",
    },
  ],
} as const satisfies Episode
