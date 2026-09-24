import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const adele30WomanLikeMe = {
  id: "01a0d52b-c25a-71f3-a2a0-5d5bd79d4f48",
  type: "page-type/track",
  slug: "adele-30-woman-like-me",
  ownLength: 5.0041166666666665,
  ownProgress: 5.0041166666666665,
  partOfCollections: ["release/adele-30"],
  status: "completed",
  unit: "unit/minutes",
  title: "Woman Like Me",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/adele" }],
  trackKey: "womanlikeme|4dpARuHxo51G3z768sgnrY|300247",
  song: "song/adele-woman-like-me",
  carriedBy: [
    {
      release: "release/adele-30",
      discNumber: 1,
      position: 9,
      externalId: "2c6xRsQBv7pynuhYhWoHxo",
      externalLink: "https://open.spotify.com/track/2c6xRsQBv7pynuhYhWoHxo",
    },
  ],
} as const satisfies Track
