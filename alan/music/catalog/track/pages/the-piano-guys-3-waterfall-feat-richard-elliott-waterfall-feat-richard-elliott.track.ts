import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3WaterfallFeatRichardElliottWaterfallFeatRichardElliott = {
  id: "01a0afa1-f1a9-7b4b-bc5a-c3c409cff028",
  type: "page-type/track",
  slug: "the-piano-guys-3-waterfall-feat-richard-elliott-waterfall-feat-richard-elliott",
  ownLength: 3.1216,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-waterfall-feat-richard-elliott"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "04yTIa8owaSc7Yd25h76sX",
      externalLink: "https://open.spotify.com/track/04yTIa8owaSc7Yd25h76sX",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Waterfall - feat. Richard Elliott",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" },
    { externalId: "1GRl6sRyLg9ToOohIE2wW5", artistName: "The Tabernacle Choir at Temple Square" },
    { externalId: "50Bzsa2Le4qOPs6lrfKuzY", artistName: "Richard Elliott" },
  ],
  trackKey:
    "waterfallfeatrichardelliott|0jW6R8CVyVohuUJVcuweDI,1GRl6sRyLg9ToOohIE2wW5,50Bzsa2Le4qOPs6lrfKuzY|187296",
  song: "song/the-piano-guys-waterfall",
} as const satisfies Track
