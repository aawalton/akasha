import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2HourglassHangnail = {
  id: "01a0abeb-3b99-7470-9465-85384b713f04",
  type: "page-type/track",
  slug: "james-taylor-2-hourglass-hangnail",
  ownLength: 2.35555,
  ownProgress: 2.35555,
  partOfCollections: ["release/james-taylor-2-hourglass"],
  status: "completed",
  unit: "unit/minutes",
  title: "Hangnail",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/james-taylor" }],
  trackKey: "hangnail|0vn7UBvSQECKJm2817Yf1P|141333",
  song: "song/james-taylor-hangnail",
  carriedBy: [
    {
      release: "release/james-taylor-2-hourglass",
      discNumber: 1,
      position: 13,
      externalId: "7onpA2Bnovg4a2mhcbOrMf",
      externalLink: "https://open.spotify.com/track/7onpA2Bnovg4a2mhcbOrMf",
    },
  ],
} as const satisfies Track
