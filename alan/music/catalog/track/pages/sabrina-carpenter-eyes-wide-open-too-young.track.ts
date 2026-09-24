import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterEyesWideOpenTooYoung = {
  id: "01a0b111-2910-7280-be00-8e5824a2759b",
  type: "page-type/track",
  slug: "sabrina-carpenter-eyes-wide-open-too-young",
  ownLength: 4.2391,
  ownProgress: 4.2391,
  partOfCollections: ["release/sabrina-carpenter-eyes-wide-open"],
  status: "completed",
  unit: "unit/minutes",
  title: "Too Young",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/sabrina-carpenter" }],
  trackKey: "tooyoung|74KM79TiuVKeVCqs8QtB0B|254346",
  song: "song/sabrina-carpenter-too-young",
  carriedBy: [
    {
      release: "release/sabrina-carpenter-eyes-wide-open",
      discNumber: 1,
      position: 7,
      externalId: "694MyEbGgAtoEVYqdtfvp2",
      externalLink: "https://open.spotify.com/track/694MyEbGgAtoEVYqdtfvp2",
    },
  ],
} as const satisfies Track
