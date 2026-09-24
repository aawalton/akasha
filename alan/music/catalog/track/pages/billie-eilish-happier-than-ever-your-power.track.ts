import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const billieEilishHappierThanEverYourPower = {
  id: "01a0b638-e537-7fef-8ec0-27c041793213",
  type: "page-type/track",
  slug: "billie-eilish-happier-than-ever-your-power",
  ownLength: 4.0982666666666665,
  ownProgress: 4.0982666666666665,
  partOfCollections: ["release/billie-eilish-happier-than-ever"],
  status: "completed",
  unit: "unit/minutes",
  title: "Your Power",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/billie-eilish" }],
  trackKey: "yourpower|6qqNVTkY8uBg9cP3Jd7DAH|245896",
  song: "song/billie-eilish-your-power",
  carriedBy: [
    {
      release: "release/billie-eilish-happier-than-ever",
      discNumber: 1,
      position: 12,
      externalId: "042Sl6Mn83JHyLEqdK7uI0",
      externalLink: "https://open.spotify.com/track/042Sl6Mn83JHyLEqdK7uI0",
    },
  ],
} as const satisfies Track
