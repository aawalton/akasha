import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3UnchartedHoldingOn = {
  id: "01a0afa2-1245-73ca-8e1a-4976031c9f15",
  type: "page-type/track",
  slug: "the-piano-guys-3-uncharted-holding-on",
  ownLength: 3.441666666666667,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-uncharted"],
  position: 8,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4NtdfercTqkeThHmZwMrtZ",
      externalLink: "https://open.spotify.com/track/4NtdfercTqkeThHmZwMrtZ",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Holding On",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "holdingon|0jW6R8CVyVohuUJVcuweDI|206500",
  song: "song/the-piano-guys-holding-on",
} as const satisfies Track
