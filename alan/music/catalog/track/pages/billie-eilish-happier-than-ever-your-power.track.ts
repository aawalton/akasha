import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const billieEilishHappierThanEverYourPower = {
  id: "01a0b638-e537-7fef-8ec0-27c041793213",
  type: "page-type/track",
  slug: "billie-eilish-happier-than-ever-your-power",
  ownLength: 4.0982666666666665,
  ownProgress: 0,
  partOfCollections: ["release/billie-eilish-happier-than-ever"],
  position: 12,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "042Sl6Mn83JHyLEqdK7uI0",
      externalLink: "https://open.spotify.com/track/042Sl6Mn83JHyLEqdK7uI0",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Your Power",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6qqNVTkY8uBg9cP3Jd7DAH", artistName: "Billie Eilish" }],
  trackKey: "yourpower|6qqNVTkY8uBg9cP3Jd7DAH|245896",
  song: "song/billie-eilish-your-power",
} as const satisfies Track
