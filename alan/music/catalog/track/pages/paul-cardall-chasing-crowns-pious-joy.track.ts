import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallChasingCrownsPiousJoy = {
  id: "01a0b4c8-2177-7cfd-a2e3-022169e12435",
  type: "page-type/track",
  slug: "paul-cardall-chasing-crowns-pious-joy",
  ownLength: 3.841666666666667,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-chasing-crowns"],
  position: 7,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7Fv1OTEguxBFL8pMUZ4ro9",
      externalLink: "https://open.spotify.com/track/7Fv1OTEguxBFL8pMUZ4ro9",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Pious Joy",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "piousjoy|7FQRbf8gbKw8KZQZAJWxH2|230500",
  song: "song/paul-cardall-pious-joy",
} as const satisfies Track
