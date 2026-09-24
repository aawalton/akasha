import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const billieEilishHitMeHardAndSoftSkinny = {
  id: "01a0b638-e222-7d47-99ac-abb2529e89ec",
  type: "page-type/track",
  slug: "billie-eilish-hit-me-hard-and-soft-skinny",
  ownLength: 3.6622166666666667,
  ownProgress: 3.6622166666666667,
  partOfCollections: ["release/billie-eilish-hit-me-hard-and-soft"],
  status: "completed",
  unit: "unit/minutes",
  title: "SKINNY",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/billie-eilish" }],
  trackKey: "skinny|6qqNVTkY8uBg9cP3Jd7DAH|219733",
  song: "song/billie-eilish-skinny",
  carriedBy: [
    {
      release: "release/billie-eilish-hit-me-hard-and-soft",
      discNumber: 1,
      position: 1,
      externalId: "1CsMKhwEmNnmvHUuO5nryA",
      externalLink: "https://open.spotify.com/track/1CsMKhwEmNnmvHUuO5nryA",
    },
  ],
} as const satisfies Track
