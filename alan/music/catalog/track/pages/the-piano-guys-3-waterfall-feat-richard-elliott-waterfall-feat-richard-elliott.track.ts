import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3WaterfallFeatRichardElliottWaterfallFeatRichardElliott = {
  id: "01a0afa1-f1a9-7b4b-bc5a-c3c409cff028",
  type: "page-type/track",
  slug: "the-piano-guys-3-waterfall-feat-richard-elliott-waterfall-feat-richard-elliott",
  ownLength: 3.1216,
  ownProgress: 3.1216,
  partOfCollections: ["release/the-piano-guys-3-waterfall-feat-richard-elliott"],
  status: "completed",
  unit: "unit/minutes",
  title: "Waterfall - feat. Richard Elliott",
  trackType: "studio",
  explicit: false,
  trackArtist: [
    { artist: "artist/the-piano-guys" },
    { artist: "artist/the-tabernacle-choir-at-temple-square" },
    { artistName: "Richard Elliott" },
  ],
  trackKey:
    "waterfallfeatrichardelliott|0jW6R8CVyVohuUJVcuweDI,1GRl6sRyLg9ToOohIE2wW5,50Bzsa2Le4qOPs6lrfKuzY|187296",
  song: "song/the-piano-guys-waterfall",
  carriedBy: [
    {
      release: "release/the-piano-guys-3-waterfall-feat-richard-elliott",
      discNumber: 1,
      position: 1,
      externalId: "04yTIa8owaSc7Yd25h76sX",
      externalLink: "https://open.spotify.com/track/04yTIa8owaSc7Yd25h76sX",
    },
  ],
} as const satisfies Track
