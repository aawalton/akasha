import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeYesAndFelixJaehnRemixYesAndFelixJaehnRemix = {
  id: "01a0a6c5-3567-7326-b52e-28945097d3cf",
  type: "page-type/track",
  slug: "ariana-grande-yes-and-felix-jaehn-remix-yes-and-felix-jaehn-remix",
  ownLength: 3.9231666666666665,
  ownProgress: 3.9231666666666665,
  partOfCollections: [
    "release/ariana-grande-yes-and-felix-jaehn-remix",
    "release/ariana-grande-yes-and-remixes",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "yes, and? - Felix Jaehn Remix",
  trackType: "remix",
  explicit: true,
  trackArtist: [{ artist: "artist/ariana-grande" }, { artistName: "felix jaehn" }],
  trackKey: "yesandfelixjaehnremix|4bL2B6hmLlMWnUEZnorEtG,66CXWjxzNUsdJxJ2JdwvnR|235390",
  song: "song/ariana-grande-yes-and",
  carriedBy: [
    {
      release: "release/ariana-grande-yes-and-felix-jaehn-remix",
      discNumber: 1,
      position: 1,
      externalId: "7dr1lLSbw7UaEch1ycBxRc",
      externalLink: "https://open.spotify.com/track/7dr1lLSbw7UaEch1ycBxRc",
    },
    {
      release: "release/ariana-grande-yes-and-remixes",
      discNumber: 1,
      position: 1,
      externalId: "6R5licKQW6P3UD64RWtKxb",
      externalLink: "https://open.spotify.com/track/6R5licKQW6P3UD64RWtKxb",
    },
  ],
} as const satisfies Track
