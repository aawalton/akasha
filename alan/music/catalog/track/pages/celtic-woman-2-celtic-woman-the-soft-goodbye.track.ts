import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2CelticWomanTheSoftGoodbye = {
  id: "01a0abea-79f1-7117-8f6d-96a6fb1cff5d",
  type: "page-type/track",
  slug: "celtic-woman-2-celtic-woman-the-soft-goodbye",
  ownLength: 3.985333333333333,
  ownProgress: 3.985333333333333,
  partOfCollections: ["release/celtic-woman-2-celtic-woman"],
  status: "completed",
  unit: "unit/minutes",
  title: "The Soft Goodbye",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/celtic-woman" }],
  trackKey: "thesoftgoodbye|6NWtt9pNOL2Gx7kBykdE5x|239120",
  song: "song/celtic-woman-the-soft-goodbye",
  carriedBy: [
    {
      release: "release/celtic-woman-2-celtic-woman",
      discNumber: 1,
      position: 15,
      externalId: "30TNRTx436onqMfH6YHiG3",
      externalLink: "https://open.spotify.com/track/30TNRTx436onqMfH6YHiG3",
    },
  ],
} as const satisfies Track
