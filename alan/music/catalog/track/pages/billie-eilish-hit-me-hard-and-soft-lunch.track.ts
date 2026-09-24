import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const billieEilishHitMeHardAndSoftLunch = {
  id: "01a0b638-e24c-7be1-aac3-880f51acff61",
  type: "page-type/track",
  slug: "billie-eilish-hit-me-hard-and-soft-lunch",
  ownLength: 2.9931,
  ownProgress: 2.9931,
  partOfCollections: ["release/billie-eilish-hit-me-hard-and-soft"],
  status: "completed",
  unit: "unit/minutes",
  title: "LUNCH",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/billie-eilish" }],
  trackKey: "lunch|6qqNVTkY8uBg9cP3Jd7DAH|179586",
  song: "song/billie-eilish-lunch",
  carriedBy: [
    {
      release: "release/billie-eilish-hit-me-hard-and-soft",
      discNumber: 1,
      position: 2,
      externalId: "629DixmZGHc7ILtEntuiWE",
      externalLink: "https://open.spotify.com/track/629DixmZGHc7ILtEntuiWE",
    },
  ],
} as const satisfies Track
