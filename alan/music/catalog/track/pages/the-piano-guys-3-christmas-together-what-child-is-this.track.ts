import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3ChristmasTogetherWhatChildIsThis = {
  id: "01a0afa2-103c-70dd-b1ad-5d359504bde2",
  type: "page-type/track",
  slug: "the-piano-guys-3-christmas-together-what-child-is-this",
  ownLength: 2.9854166666666666,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-christmas-together"],
  position: 5,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "40LRZ7NA5Pv7PVgsV7sQW1",
      externalLink: "https://open.spotify.com/track/40LRZ7NA5Pv7PVgsV7sQW1",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "What Child is This",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "whatchildisthis|0jW6R8CVyVohuUJVcuweDI|179125",
  song: "song/the-piano-guys-what-child-is-this",
} as const satisfies Track
