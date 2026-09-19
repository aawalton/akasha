import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallPeacefulPianoAfterTheRainFall = {
  id: "01a0b4c8-3245-74cc-9637-0aa6b4b958e0",
  type: "page-type/track",
  slug: "paul-cardall-peaceful-piano-after-the-rain-fall",
  ownLength: 4.6831,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-peaceful-piano"],
  position: 8,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4INuKoAd77rfgdGSMuOBRT",
      externalLink: "https://open.spotify.com/track/4INuKoAd77rfgdGSMuOBRT",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "After the Rain Fall",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "aftertherainfall|7FQRbf8gbKw8KZQZAJWxH2|280986",
  song: "song/paul-cardall-after-the-rain-fall",
} as const satisfies Track
