import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const yaelokreForewordKamahalan = {
  id: "01a0ce87-1281-7446-a0d7-7f9b050e2362",
  type: "page-type/track",
  slug: "yaelokre-foreword-kamahalan",
  ownLength: 3.1206666666666667,
  ownProgress: 0,
  partOfCollections: ["release/yaelokre-foreword"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Kamahalan",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/yaelokre" }, { artistName: "Keath Ósk" }],
  trackKey: "kamahalan|3rRyfgGByetsaaujkjQ7rY,5nS4Ohh7IG844fp1Eu1GMI|187240",
  song: "song/yaelokre-kamahalan",
  carriedBy: [
    {
      release: "release/yaelokre-foreword",
      discNumber: 1,
      position: 9,
      externalId: "0sUBOIdWu7XYDPISFcvtAa",
      externalLink: "https://open.spotify.com/track/0sUBOIdWu7XYDPISFcvtAa",
    },
  ],
} as const satisfies Track
