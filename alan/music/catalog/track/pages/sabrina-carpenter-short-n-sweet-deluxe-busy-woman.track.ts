import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterShortNSweetDeluxeBusyWoman = {
  id: "01a0b111-1f0c-765f-bea6-bcc754f00fbb",
  type: "page-type/track",
  slug: "sabrina-carpenter-short-n-sweet-deluxe-busy-woman",
  ownLength: 3.1102,
  ownProgress: 3.1102,
  partOfCollections: ["release/sabrina-carpenter-short-n-sweet-deluxe"],
  status: "completed",
  unit: "unit/minutes",
  title: "Busy Woman",
  trackType: "studio",
  explicit: true,
  trackArtist: [{ artist: "artist/sabrina-carpenter" }],
  trackKey: "busywoman|74KM79TiuVKeVCqs8QtB0B|186612",
  song: "song/sabrina-carpenter-busy-woman",
  carriedBy: [
    {
      release: "release/sabrina-carpenter-short-n-sweet-deluxe",
      discNumber: 1,
      position: 16,
      externalId: "0b0Dz0Gi86SVdBxYeiQcCP",
      externalLink: "https://open.spotify.com/track/0b0Dz0Gi86SVdBxYeiQcCP",
    },
  ],
} as const satisfies Track
