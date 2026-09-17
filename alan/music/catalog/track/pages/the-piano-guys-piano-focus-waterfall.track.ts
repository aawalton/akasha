import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuysPianoFocusWaterfall = {
  id: "01a0afa1-c462-7c17-9d11-98c763c275aa",
  type: "page-type/track",
  slug: "the-piano-guys-piano-focus-waterfall",
  ownLength: 3.1216,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-piano-focus"],
  position: 16,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2fs8VzuqyV7SNScgCYce06",
      externalLink: "https://open.spotify.com/track/2fs8VzuqyV7SNScgCYce06",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Waterfall",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" },
    { externalId: "1GRl6sRyLg9ToOohIE2wW5", artistName: "The Tabernacle Choir at Temple Square" },
    { externalId: "50Bzsa2Le4qOPs6lrfKuzY", artistName: "Richard Elliott" },
  ],
  trackKey: "waterfall|0jW6R8CVyVohuUJVcuweDI,1GRl6sRyLg9ToOohIE2wW5,50Bzsa2Le4qOPs6lrfKuzY|187296",
} as const satisfies Track
