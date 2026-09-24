import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2LullabySuantrai = {
  id: "01a0abea-71a1-7fa5-8a02-09ec1b532b78",
  type: "page-type/track",
  slug: "celtic-woman-2-lullaby-suantrai",
  ownLength: 3.3213333333333335,
  ownProgress: 3.3213333333333335,
  partOfCollections: ["release/celtic-woman-2-lullaby"],
  status: "completed",
  unit: "unit/minutes",
  title: "Suantraí",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/celtic-woman" }, { artistName: "Lynn Hilary" }],
  trackKey: "suantrai|0qxZhSelTxAwGRfUvYNudz,6NWtt9pNOL2Gx7kBykdE5x|199280",
  song: "song/celtic-woman-suantrai",
  carriedBy: [
    {
      release: "release/celtic-woman-2-lullaby",
      discNumber: 1,
      position: 6,
      externalId: "3ZsLzQDFMekdRZlnM0dC0P",
      externalLink: "https://open.spotify.com/track/3ZsLzQDFMekdRZlnM0dC0P",
    },
  ],
} as const satisfies Track
