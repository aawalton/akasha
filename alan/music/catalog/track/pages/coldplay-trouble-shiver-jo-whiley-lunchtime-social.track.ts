import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayTroubleShiverJoWhileyLunchtimeSocial = {
  id: "01a0b9ef-037a-7309-bd67-6dd0b57a4e4d",
  type: "page-type/track",
  slug: "coldplay-trouble-shiver-jo-whiley-lunchtime-social",
  ownLength: 4.356,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-trouble"],
  position: 3,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3Hpx4F7A30l7FiQddY6aYw",
      externalLink: "https://open.spotify.com/track/3Hpx4F7A30l7FiQddY6aYw",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Shiver (Jo Whiley Lunchtime Social)",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "shiverjowhileylunchtimesocial|4gzpq5DPGxSnKTe4SA8HAU|261360",
  song: "song/coldplay-shiver-jo-whiley-lunchtime-social",
} as const satisfies Track
