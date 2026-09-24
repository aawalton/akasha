import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const billieEilishHitMeHardAndSoftWildflower = {
  id: "01a0b638-e2bf-75d5-9849-f6246307491b",
  type: "page-type/track",
  slug: "billie-eilish-hit-me-hard-and-soft-wildflower",
  ownLength: 4.357766666666667,
  ownProgress: 4.357766666666667,
  partOfCollections: ["release/billie-eilish-hit-me-hard-and-soft"],
  status: "completed",
  unit: "unit/minutes",
  title: "WILDFLOWER",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/billie-eilish" }],
  trackKey: "wildflower|6qqNVTkY8uBg9cP3Jd7DAH|261466",
  song: "song/billie-eilish-wildflower",
  carriedBy: [
    {
      release: "release/billie-eilish-hit-me-hard-and-soft",
      discNumber: 1,
      position: 5,
      externalId: "3QaPy1KgI7nu9FJEQUgn6h",
      externalLink: "https://open.spotify.com/track/3QaPy1KgI7nu9FJEQUgn6h",
    },
  ],
} as const satisfies Track
