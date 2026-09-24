import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuysPianoFocusWaterfall = {
  id: "01a0afa1-c462-7c17-9d11-98c763c275aa",
  type: "page-type/track",
  slug: "the-piano-guys-piano-focus-waterfall",
  ownLength: 3.1216,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-piano-focus"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Waterfall",
  trackType: "studio",
  explicit: false,
  trackArtist: [
    { artist: "artist/the-piano-guys" },
    { artist: "artist/the-tabernacle-choir-at-temple-square" },
    { artistName: "Richard Elliott" },
  ],
  trackKey: "waterfall|0jW6R8CVyVohuUJVcuweDI,1GRl6sRyLg9ToOohIE2wW5,50Bzsa2Le4qOPs6lrfKuzY|187296",
  song: "song/the-piano-guys-waterfall",
  carriedBy: [
    {
      release: "release/the-piano-guys-piano-focus",
      discNumber: 1,
      position: 16,
      externalId: "2fs8VzuqyV7SNScgCYce06",
      externalLink: "https://open.spotify.com/track/2fs8VzuqyV7SNScgCYce06",
    },
  ],
} as const satisfies Track
