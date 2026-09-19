import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3ThePianoGuys2Waterfall = {
  id: "01a0afa2-20ca-7935-b1c7-80d68c45f73d",
  type: "page-type/track",
  slug: "the-piano-guys-3-the-piano-guys-2-waterfall",
  ownLength: 3.066666666666667,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-the-piano-guys-2"],
  position: 8,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1XZR9unh2oXTn5aWG60ipY",
      externalLink: "https://open.spotify.com/track/1XZR9unh2oXTn5aWG60ipY",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Waterfall",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "waterfall|0jW6R8CVyVohuUJVcuweDI|184000",
  song: "song/the-piano-guys-waterfall",
} as const satisfies Track
