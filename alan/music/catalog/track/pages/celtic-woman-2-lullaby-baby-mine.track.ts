import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2LullabyBabyMine = {
  id: "01a0abea-712e-7905-a435-9c57d2f490de",
  type: "page-type/track",
  slug: "celtic-woman-2-lullaby-baby-mine",
  ownLength: 3.1704333333333334,
  ownProgress: 3.1704333333333334,
  partOfCollections: ["release/celtic-woman-2-lullaby"],
  status: "completed",
  unit: "unit/minutes",
  title: "Baby Mine",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/celtic-woman" }, { artistName: "Chloe Agnew" }],
  trackKey: "babymine|34sL9HIOU50t8u0IQMZeze,6NWtt9pNOL2Gx7kBykdE5x|190226",
  song: "song/celtic-woman-baby-mine",
  carriedBy: [
    {
      release: "release/celtic-woman-2-lullaby",
      discNumber: 1,
      position: 3,
      externalId: "5xzgVOaAbIP7Q1891QkK3u",
      externalLink: "https://open.spotify.com/track/5xzgVOaAbIP7Q1891QkK3u",
    },
  ],
} as const satisfies Track
