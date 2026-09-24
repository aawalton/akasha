import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const billieEilishHitMeHardAndSoftTheDiner = {
  id: "01a0b638-e337-765f-a7a5-a6e439e404d8",
  type: "page-type/track",
  slug: "billie-eilish-hit-me-hard-and-soft-the-diner",
  ownLength: 3.105766666666667,
  ownProgress: 3.105766666666667,
  partOfCollections: ["release/billie-eilish-hit-me-hard-and-soft"],
  status: "completed",
  unit: "unit/minutes",
  title: "THE DINER",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/billie-eilish" }],
  trackKey: "thediner|6qqNVTkY8uBg9cP3Jd7DAH|186346",
  song: "song/billie-eilish-the-diner",
  carriedBy: [
    {
      release: "release/billie-eilish-hit-me-hard-and-soft",
      discNumber: 1,
      position: 8,
      externalId: "1LLUoftvmTjVNBHZoQyveF",
      externalLink: "https://open.spotify.com/track/1LLUoftvmTjVNBHZoQyveF",
    },
  ],
} as const satisfies Track
