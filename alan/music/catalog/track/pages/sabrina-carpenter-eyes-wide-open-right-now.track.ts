import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterEyesWideOpenRightNow = {
  id: "01a0b111-295c-701e-abdf-f3e32be6af8a",
  type: "page-type/track",
  slug: "sabrina-carpenter-eyes-wide-open-right-now",
  ownLength: 3.5871,
  ownProgress: 3.5871,
  partOfCollections: ["release/sabrina-carpenter-eyes-wide-open"],
  status: "completed",
  unit: "unit/minutes",
  title: "Right Now",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/sabrina-carpenter" }],
  trackKey: "rightnow|74KM79TiuVKeVCqs8QtB0B|215226",
  song: "song/sabrina-carpenter-right-now",
  carriedBy: [
    {
      release: "release/sabrina-carpenter-eyes-wide-open",
      discNumber: 1,
      position: 9,
      externalId: "3hqJdqziOPbu422kXaOyII",
      externalLink: "https://open.spotify.com/track/3hqJdqziOPbu422kXaOyII",
    },
  ],
} as const satisfies Track
