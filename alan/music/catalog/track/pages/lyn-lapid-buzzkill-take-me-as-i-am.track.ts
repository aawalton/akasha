import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const lynLapidBuzzkillTakeMeAsIAm = {
  id: "01a0c95e-b25f-7b1e-9336-b92b76ce71e7",
  type: "page-type/track",
  slug: "lyn-lapid-buzzkill-take-me-as-i-am",
  ownLength: 2.7344333333333335,
  ownProgress: 2.7344333333333335,
  partOfCollections: ["release/lyn-lapid-buzzkill"],
  status: "completed",
  unit: "unit/minutes",
  title: "take me as I am",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "4pfy05cNNTacuOQ6SiSu4v", artistName: "Lyn Lapid" }],
  trackKey: "takemeasiam|4pfy05cNNTacuOQ6SiSu4v|164066",
  song: "song/lyn-lapid-take-me-as-i-am",
  carriedBy: [
    {
      release: "release/lyn-lapid-buzzkill",
      discNumber: 1,
      position: 11,
      externalId: "442HUOfI6s9S4vjJ5iQIx9",
      externalLink: "https://open.spotify.com/track/442HUOfI6s9S4vjJ5iQIx9",
    },
  ],
} as const satisfies Track
