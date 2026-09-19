import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const billieEilishHappierThanEverOxytocin = {
  id: "01a0b638-e431-755e-b30c-6ee7f6a26dcf",
  type: "page-type/track",
  slug: "billie-eilish-happier-than-ever-oxytocin",
  ownLength: 3.5038666666666667,
  ownProgress: 0,
  partOfCollections: ["release/billie-eilish-happier-than-ever"],
  position: 5,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4t2OeILB07eMGTXSUbMPEu",
      externalLink: "https://open.spotify.com/track/4t2OeILB07eMGTXSUbMPEu",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Oxytocin",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6qqNVTkY8uBg9cP3Jd7DAH", artistName: "Billie Eilish" }],
  trackKey: "oxytocin|6qqNVTkY8uBg9cP3Jd7DAH|210232",
  song: "song/billie-eilish-oxytocin",
} as const satisfies Track
