import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2BelieveAWomansHeart = {
  id: "01a0abea-708f-7ac4-a9ee-78b1afbc42e6",
  type: "page-type/track",
  slug: "celtic-woman-2-believe-a-womans-heart",
  ownLength: 4.4091,
  ownProgress: 0,
  partOfCollections: ["release/celtic-woman-2-believe"],
  position: 14,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3u1JYf8wcq793uJyk51DtD",
      externalLink: "https://open.spotify.com/track/3u1JYf8wcq793uJyk51DtD",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "A Woman's Heart",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "50SDcJ4wO9jS355IoJc7O9", artistName: "Eleanor McEvoy" },
    { externalId: "6NWtt9pNOL2Gx7kBykdE5x", artistName: "Celtic Woman" },
    { externalId: "4Jl3FibWLX8mi6TtTryovX", artistName: "David Downes" },
    { externalId: "2fJCHSiF0CwzZ2vuYWtt2p", artistName: "Nick Ingman" },
  ],
  trackKey:
    "awomansheart|2fJCHSiF0CwzZ2vuYWtt2p,4Jl3FibWLX8mi6TtTryovX,50SDcJ4wO9jS355IoJc7O9,6NWtt9pNOL2Gx7kBykdE5x|264546",
  song: "song/celtic-woman-a-womans-heart",
} as const satisfies Track
