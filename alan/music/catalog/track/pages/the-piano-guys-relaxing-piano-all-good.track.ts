import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuysRelaxingPianoAllGood = {
  id: "01a0afa1-cb83-7603-bb7c-3cbcb4ead059",
  type: "page-type/track",
  slug: "the-piano-guys-relaxing-piano-all-good",
  ownLength: 2.3907166666666666,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-relaxing-piano"],
  position: 10,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7ztlfchcq5H30fAlneiRIS",
      externalLink: "https://open.spotify.com/track/7ztlfchcq5H30fAlneiRIS",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "All Good",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "allgood|0jW6R8CVyVohuUJVcuweDI|143443",
  song: "song/the-piano-guys-all-good",
} as const satisfies Track
