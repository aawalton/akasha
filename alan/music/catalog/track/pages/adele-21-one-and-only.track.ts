import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const adele21OneAndOnly = {
  id: "01a0d52b-c25a-74f9-b465-7faeaf9f55c4",
  type: "page-type/track",
  slug: "adele-21-one-and-only",
  ownLength: 5.803766666666666,
  ownProgress: 5.803766666666666,
  partOfCollections: ["release/adele-21"],
  status: "completed",
  unit: "unit/minutes",
  title: "One And Only",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/adele" }],
  trackKey: "oneandonly|4dpARuHxo51G3z768sgnrY|348226",
  song: "song/adele-one-and-only",
  carriedBy: [
    {
      release: "release/adele-21",
      discNumber: 1,
      position: 9,
      externalId: "43dcCpx19I0R4zLr4KH1UC",
      externalLink: "https://open.spotify.com/track/43dcCpx19I0R4zLr4KH1UC",
    },
  ],
} as const satisfies Track
