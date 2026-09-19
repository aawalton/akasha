import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3WondersTheMissionHowGreatThouArt = {
  id: "01a0afa2-16bb-780b-94a5-9f0bf9897a15",
  type: "page-type/track",
  slug: "the-piano-guys-3-wonders-the-mission-how-great-thou-art",
  ownLength: 3.10955,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-wonders"],
  position: 10,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1paWB93HOc8W9RAZRooFg4",
      externalLink: "https://open.spotify.com/track/1paWB93HOc8W9RAZRooFg4",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "The Mission / How Great Thou Art",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "themissionhowgreatthouart|0jW6R8CVyVohuUJVcuweDI|186573",
  song: "song/the-piano-guys-the-mission-how-great-thou-art",
} as const satisfies Track
