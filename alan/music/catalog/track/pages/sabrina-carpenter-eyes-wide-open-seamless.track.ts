import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterEyesWideOpenSeamless = {
  id: "01a0b111-2934-7176-b04e-513f28b014a9",
  type: "page-type/track",
  slug: "sabrina-carpenter-eyes-wide-open-seamless",
  ownLength: 3.1073333333333335,
  ownProgress: 3.1073333333333335,
  partOfCollections: ["release/sabrina-carpenter-eyes-wide-open"],
  status: "completed",
  unit: "unit/minutes",
  title: "Seamless",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/sabrina-carpenter" }],
  trackKey: "seamless|74KM79TiuVKeVCqs8QtB0B|186440",
  song: "song/sabrina-carpenter-seamless",
  carriedBy: [
    {
      release: "release/sabrina-carpenter-eyes-wide-open",
      discNumber: 1,
      position: 8,
      externalId: "75s1b4uRCk6UPOPBLNdDIA",
      externalLink: "https://open.spotify.com/track/75s1b4uRCk6UPOPBLNdDIA",
    },
  ],
} as const satisfies Track
