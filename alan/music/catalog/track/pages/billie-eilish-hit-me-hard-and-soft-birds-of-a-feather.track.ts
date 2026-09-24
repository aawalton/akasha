import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const billieEilishHitMeHardAndSoftBirdsOfAFeather = {
  id: "01a0b638-e298-7d78-b4cf-27adb4c9722e",
  type: "page-type/track",
  slug: "billie-eilish-hit-me-hard-and-soft-birds-of-a-feather",
  ownLength: 3.5062166666666665,
  ownProgress: 3.5062166666666665,
  partOfCollections: ["release/billie-eilish-hit-me-hard-and-soft"],
  status: "completed",
  unit: "unit/minutes",
  title: "BIRDS OF A FEATHER",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/billie-eilish" }],
  trackKey: "birdsofafeather|6qqNVTkY8uBg9cP3Jd7DAH|210373",
  song: "song/billie-eilish-birds-of-a-feather",
  carriedBy: [
    {
      release: "release/billie-eilish-hit-me-hard-and-soft",
      discNumber: 1,
      position: 4,
      externalId: "6dOtVTDdiauQNBQEDOtlAB",
      externalLink: "https://open.spotify.com/track/6dOtVTDdiauQNBQEDOtlAB",
    },
  ],
} as const satisfies Track
