import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3LiveThePianoGuysIntroductionLive = {
  id: "01a0afa2-12ee-7183-a860-c931db5c14b9",
  type: "page-type/track",
  slug: "the-piano-guys-3-live-the-piano-guys-introduction-live",
  ownLength: 1.1893333333333334,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-live"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1ujnK4iiQcyXOL8GnM2Gno",
      externalLink: "https://open.spotify.com/track/1ujnK4iiQcyXOL8GnM2Gno",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "The Piano Guys (Introduction) - Live",
  trackType: "live",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "thepianoguysintroductionlive|0jW6R8CVyVohuUJVcuweDI|71360",
  song: "song/the-piano-guys-the-piano-guys-introduction",
} as const satisfies Track
