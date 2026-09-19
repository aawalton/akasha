import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3TheMissionHowGreatThouArtTheMissionHowGreatThouArt = {
  id: "01a0afa1-ee21-7cf1-a08f-3d49fa471631",
  type: "page-type/track",
  slug: "the-piano-guys-3-the-mission-how-great-thou-art-the-mission-how-great-thou-art",
  ownLength: 3.3592833333333334,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-the-mission-how-great-thou-art"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2KhWdTFxVY18HQxK9RtKeF",
      externalLink: "https://open.spotify.com/track/2KhWdTFxVY18HQxK9RtKeF",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "The Mission / How Great Thou Art",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" },
    { externalId: "1GRl6sRyLg9ToOohIE2wW5", artistName: "The Tabernacle Choir at Temple Square" },
  ],
  trackKey: "themissionhowgreatthouart|0jW6R8CVyVohuUJVcuweDI,1GRl6sRyLg9ToOohIE2wW5|201557",
  song: "song/the-piano-guys-the-mission-how-great-thou-art",
} as const satisfies Track
