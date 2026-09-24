import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2AmericanStandardPenniesFromHeaven = {
  id: "01a0abeb-2f32-7c84-8ac3-f6900d451504",
  type: "page-type/track",
  slug: "james-taylor-2-american-standard-pennies-from-heaven",
  ownLength: 2.8706666666666667,
  ownProgress: 2.8706666666666667,
  partOfCollections: ["release/james-taylor-2-american-standard"],
  status: "completed",
  unit: "unit/minutes",
  title: "Pennies From Heaven",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/james-taylor" }],
  trackKey: "penniesfromheaven|0vn7UBvSQECKJm2817Yf1P|172240",
  song: "song/james-taylor-pennies-from-heaven",
  carriedBy: [
    {
      release: "release/james-taylor-2-american-standard",
      discNumber: 1,
      position: 10,
      externalId: "2n7ObUjqWJ1k8GVhpHSbxM",
      externalLink: "https://open.spotify.com/track/2n7ObUjqWJ1k8GVhpHSbxM",
    },
  ],
} as const satisfies Track
