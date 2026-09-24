import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const billieEilishHappierThanEverOxytocin = {
  id: "01a0b638-e431-755e-b30c-6ee7f6a26dcf",
  type: "page-type/track",
  slug: "billie-eilish-happier-than-ever-oxytocin",
  ownLength: 3.5038666666666667,
  ownProgress: 3.5038666666666667,
  partOfCollections: ["release/billie-eilish-happier-than-ever"],
  status: "completed",
  unit: "unit/minutes",
  title: "Oxytocin",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/billie-eilish" }],
  trackKey: "oxytocin|6qqNVTkY8uBg9cP3Jd7DAH|210232",
  song: "song/billie-eilish-oxytocin",
  carriedBy: [
    {
      release: "release/billie-eilish-happier-than-ever",
      discNumber: 1,
      position: 5,
      externalId: "4t2OeILB07eMGTXSUbMPEu",
      externalLink: "https://open.spotify.com/track/4t2OeILB07eMGTXSUbMPEu",
    },
  ],
} as const satisfies Track
