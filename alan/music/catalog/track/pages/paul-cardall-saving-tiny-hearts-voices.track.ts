import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallSavingTinyHeartsVoices = {
  id: "01a0b4c8-3d3c-7c72-8cd3-0708ae780372",
  type: "page-type/track",
  slug: "paul-cardall-saving-tiny-hearts-voices",
  ownLength: 5.0131,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-saving-tiny-hearts"],
  position: 5,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7gZAdeyC9vbc0x4ZszHo4s",
      externalLink: "https://open.spotify.com/track/7gZAdeyC9vbc0x4ZszHo4s",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Voices",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "voices|7FQRbf8gbKw8KZQZAJWxH2|300786",
  song: "song/paul-cardall-voices",
} as const satisfies Track
