import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayYellowHelpIsRoundTheCorner = {
  id: "01a0b9ef-03c8-7567-9994-cbaf7c33963c",
  type: "page-type/track",
  slug: "coldplay-yellow-help-is-round-the-corner",
  ownLength: 2.6026666666666665,
  ownProgress: 2.6026666666666665,
  partOfCollections: ["release/coldplay-yellow"],
  status: "completed",
  unit: "unit/minutes",
  title: "Help Is Round the Corner",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "helpisroundthecorner|4gzpq5DPGxSnKTe4SA8HAU|156160",
  song: "song/coldplay-help-is-round-the-corner",
  carriedBy: [
    {
      release: "release/coldplay-yellow",
      discNumber: 1,
      position: 2,
      externalId: "1AmYC6YsrtkxpTfiv3nFBn",
      externalLink: "https://open.spotify.com/track/1AmYC6YsrtkxpTfiv3nFBn",
    },
  ],
} as const satisfies Track
