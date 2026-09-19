import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallSavingTinyHeartsEyeToEye = {
  id: "01a0b4c8-3e1a-71c6-b5c3-4f67040ac324",
  type: "page-type/track",
  slug: "paul-cardall-saving-tiny-hearts-eye-to-eye",
  ownLength: 4.4844333333333335,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-saving-tiny-hearts"],
  position: 11,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6RyZT7kfXy8ajOCpzjHVlt",
      externalLink: "https://open.spotify.com/track/6RyZT7kfXy8ajOCpzjHVlt",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Eye to Eye",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "eyetoeye|7FQRbf8gbKw8KZQZAJWxH2|269066",
  song: "song/paul-cardall-eye-to-eye",
} as const satisfies Track
