import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallSavingTinyHeartsTime = {
  id: "01a0b4c8-3d62-7628-a804-eed205da8e26",
  type: "page-type/track",
  slug: "paul-cardall-saving-tiny-hearts-time",
  ownLength: 3.193766666666667,
  ownProgress: 3.193766666666667,
  partOfCollections: ["release/paul-cardall-saving-tiny-hearts"],
  position: 6,
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0KzGkaHpOkqY38zsnbs1Fs",
      externalLink: "https://open.spotify.com/track/0KzGkaHpOkqY38zsnbs1Fs",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Time",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "time|7FQRbf8gbKw8KZQZAJWxH2|191626",
  song: "song/paul-cardall-time",
  carriedBy: [
    {
      release: "release/paul-cardall-saving-tiny-hearts",
      discNumber: 1,
      position: 6,
      externalId: "0KzGkaHpOkqY38zsnbs1Fs",
      externalLink: "https://open.spotify.com/track/0KzGkaHpOkqY38zsnbs1Fs",
    },
  ],
} as const satisfies Track
