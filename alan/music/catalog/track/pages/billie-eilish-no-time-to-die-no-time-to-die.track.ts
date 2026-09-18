import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const billieEilishNoTimeToDieNoTimeToDie = {
  id: "01a0b638-e9e3-7ec3-a957-0e16045e5227",
  type: "page-type/track",
  slug: "billie-eilish-no-time-to-die-no-time-to-die",
  ownLength: 4.03775,
  ownProgress: 0,
  partOfCollections: ["release/billie-eilish-no-time-to-die"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "73SpzrcaHk0RQPFP73vqVR",
      externalLink: "https://open.spotify.com/track/73SpzrcaHk0RQPFP73vqVR",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "No Time To Die",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6qqNVTkY8uBg9cP3Jd7DAH", artistName: "Billie Eilish" }],
  trackKey: "notimetodie|6qqNVTkY8uBg9cP3Jd7DAH|242265",
} as const satisfies Track
