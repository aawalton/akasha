import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const adele25Hello = {
  id: "01a0d52b-c25a-7955-8fdf-5c9daeb7b826",
  type: "page-type/track",
  slug: "adele-25-hello",
  ownLength: 4.925033333333333,
  ownProgress: 4.925033333333333,
  partOfCollections: ["release/adele-25", "release/adele-hello"],
  status: "completed",
  unit: "unit/minutes",
  title: "Hello",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/adele" }],
  trackKey: "hello|4dpARuHxo51G3z768sgnrY|295502",
  song: "song/adele-hello",
  carriedBy: [
    {
      release: "release/adele-25",
      discNumber: 1,
      position: 1,
      externalId: "62PaSfnXSMyLshYJrlTuL3",
      externalLink: "https://open.spotify.com/track/62PaSfnXSMyLshYJrlTuL3",
    },
    {
      release: "release/adele-hello",
      discNumber: 1,
      position: 1,
      externalId: "3AuzZHPlohKLpildLyORSM",
      externalLink: "https://open.spotify.com/track/3AuzZHPlohKLpildLyORSM",
    },
  ],
} as const satisfies Track
