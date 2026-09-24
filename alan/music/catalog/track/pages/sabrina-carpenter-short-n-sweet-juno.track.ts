import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterShortNSweetJuno = {
  id: "01a0b111-20be-776e-a3b4-606720acdfee",
  type: "page-type/track",
  slug: "sabrina-carpenter-short-n-sweet-juno",
  ownLength: 3.719866666666667,
  ownProgress: 3.719866666666667,
  partOfCollections: ["release/sabrina-carpenter-short-n-sweet"],
  status: "completed",
  unit: "unit/minutes",
  title: "Juno",
  trackType: "studio",
  explicit: true,
  trackArtist: [{ artist: "artist/sabrina-carpenter" }],
  trackKey: "juno|74KM79TiuVKeVCqs8QtB0B|223192",
  song: "song/sabrina-carpenter-juno",
  carriedBy: [
    {
      release: "release/sabrina-carpenter-short-n-sweet",
      discNumber: 1,
      position: 10,
      externalId: "21B4gaTWnTkuSh77iWEXdS",
      externalLink: "https://open.spotify.com/track/21B4gaTWnTkuSh77iWEXdS",
    },
  ],
} as const satisfies Track
