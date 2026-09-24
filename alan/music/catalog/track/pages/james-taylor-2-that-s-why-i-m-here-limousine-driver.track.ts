import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2ThatSWhyIMHereLimousineDriver = {
  id: "01a0abeb-428d-772f-a2d2-ef26550bfd9c",
  type: "page-type/track",
  slug: "james-taylor-2-that-s-why-i-m-here-limousine-driver",
  ownLength: 3.82555,
  ownProgress: 3.82555,
  partOfCollections: ["release/james-taylor-2-that-s-why-i-m-here"],
  status: "completed",
  unit: "unit/minutes",
  title: "Limousine Driver",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/james-taylor" }],
  trackKey: "limousinedriver|0vn7UBvSQECKJm2817Yf1P|229533",
  song: "song/james-taylor-limousine-driver",
  carriedBy: [
    {
      release: "release/james-taylor-2-that-s-why-i-m-here",
      discNumber: 1,
      position: 8,
      externalId: "0y1wf0JkZFfCUMPX5td0wW",
      externalLink: "https://open.spotify.com/track/0y1wf0JkZFfCUMPX5td0wW",
    },
  ],
} as const satisfies Track
