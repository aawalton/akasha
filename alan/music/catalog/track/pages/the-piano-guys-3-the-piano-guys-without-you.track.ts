import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3ThePianoGuysWithoutYou = {
  id: "01a0afa2-1a90-7b3b-b655-e1e8718634c8",
  type: "page-type/track",
  slug: "the-piano-guys-3-the-piano-guys-without-you",
  ownLength: 3.64355,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-the-piano-guys"],
  position: 15,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "11bCHjLwV7XLUc94MKK57O",
      externalLink: "https://open.spotify.com/track/11bCHjLwV7XLUc94MKK57O",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Without You",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "withoutyou|0jW6R8CVyVohuUJVcuweDI|218613",
  song: "song/the-piano-guys-without-you",
} as const satisfies Track
