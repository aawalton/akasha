import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayMyloXylotoMajorMinus = {
  id: "01a0b9ee-dd25-7e61-badc-10213fe60c50",
  type: "page-type/track",
  slug: "coldplay-mylo-xyloto-major-minus",
  ownLength: 3.5054,
  ownProgress: 3.5054,
  partOfCollections: ["release/coldplay-mylo-xyloto"],
  status: "completed",
  unit: "unit/minutes",
  title: "Major Minus",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "majorminus|4gzpq5DPGxSnKTe4SA8HAU|210324",
  song: "song/coldplay-major-minus",
  carriedBy: [
    {
      release: "release/coldplay-mylo-xyloto",
      discNumber: 1,
      position: 8,
      externalId: "6maXBs9zUY48m1UNHgTeRC",
      externalLink: "https://open.spotify.com/track/6maXBs9zUY48m1UNHgTeRC",
    },
  ],
} as const satisfies Track
