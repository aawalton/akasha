import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallMiraclesAJourneyOfHopeHealingVoices = {
  id: "01a0b4c8-5afb-7a38-8c7a-6034e4d6c130",
  type: "page-type/track",
  slug: "paul-cardall-miracles-a-journey-of-hope-healing-voices",
  ownLength: 5.0131,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-miracles-a-journey-of-hope-healing"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7DTVHqCt786rrATJqSJb2N",
      externalLink: "https://open.spotify.com/track/7DTVHqCt786rrATJqSJb2N",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Voices",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "voices|7FQRbf8gbKw8KZQZAJWxH2|300786",
  song: "song/paul-cardall-voices",
} as const satisfies Track
