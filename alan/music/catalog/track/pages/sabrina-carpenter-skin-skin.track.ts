import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterSkinSkin = {
  id: "01a0b111-2f57-78ef-96fa-19cc5d046357",
  type: "page-type/track",
  slug: "sabrina-carpenter-skin-skin",
  ownLength: 2.9583333333333335,
  ownProgress: 2.9583333333333335,
  partOfCollections: ["release/sabrina-carpenter-skin"],
  status: "completed",
  unit: "unit/minutes",
  title: "Skin",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/sabrina-carpenter" }],
  trackKey: "skin|74KM79TiuVKeVCqs8QtB0B|177500",
  song: "song/sabrina-carpenter-skin",
  carriedBy: [
    {
      release: "release/sabrina-carpenter-skin",
      discNumber: 1,
      position: 1,
      externalId: "03B2SfXuvDh1m9F4tqrX07",
      externalLink: "https://open.spotify.com/track/03B2SfXuvDh1m9F4tqrX07",
    },
  ],
} as const satisfies Track
