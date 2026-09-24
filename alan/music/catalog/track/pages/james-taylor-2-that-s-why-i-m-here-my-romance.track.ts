import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2ThatSWhyIMHereMyRomance = {
  id: "01a0abeb-424c-707e-87b5-50ffe28546ad",
  type: "page-type/track",
  slug: "james-taylor-2-that-s-why-i-m-here-my-romance",
  ownLength: 2.77155,
  ownProgress: 2.77155,
  partOfCollections: ["release/james-taylor-2-that-s-why-i-m-here"],
  status: "completed",
  unit: "unit/minutes",
  title: "My Romance",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/james-taylor" }],
  trackKey: "myromance|0vn7UBvSQECKJm2817Yf1P|166293",
  song: "song/james-taylor-my-romance",
  carriedBy: [
    {
      release: "release/james-taylor-2-that-s-why-i-m-here",
      discNumber: 1,
      position: 6,
      externalId: "0ux5jhMGkZfmApSNddgLxF",
      externalLink: "https://open.spotify.com/track/0ux5jhMGkZfmApSNddgLxF",
    },
  ],
} as const satisfies Track
