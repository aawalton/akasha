import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2HourglassAnotherDay = {
  id: "01a0abeb-3ab5-723a-803c-d3a22cab4885",
  type: "page-type/track",
  slug: "james-taylor-2-hourglass-another-day",
  ownLength: 2.3562166666666666,
  ownProgress: 2.3562166666666666,
  partOfCollections: ["release/james-taylor-2-hourglass"],
  status: "completed",
  unit: "unit/minutes",
  title: "Another Day",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/james-taylor" }],
  trackKey: "anotherday|0vn7UBvSQECKJm2817Yf1P|141373",
  song: "song/james-taylor-another-day",
  carriedBy: [
    {
      release: "release/james-taylor-2-hourglass",
      discNumber: 1,
      position: 7,
      externalId: "5lu9nUZStqCZrk8mvJvdpS",
      externalLink: "https://open.spotify.com/track/5lu9nUZStqCZrk8mvJvdpS",
    },
  ],
} as const satisfies Track
