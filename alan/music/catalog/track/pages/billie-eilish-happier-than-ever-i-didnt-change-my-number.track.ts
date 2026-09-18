import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const billieEilishHappierThanEverIDidntChangeMyNumber = {
  id: "01a0b638-e3c9-7001-ac29-db3e428d0283",
  type: "page-type/track",
  slug: "billie-eilish-happier-than-ever-i-didnt-change-my-number",
  ownLength: 2.64105,
  ownProgress: 0,
  partOfCollections: ["release/billie-eilish-happier-than-ever"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7bcy34fBT2ap1L4bfPsl9q",
      externalLink: "https://open.spotify.com/track/7bcy34fBT2ap1L4bfPsl9q",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "I Didn't Change My Number",
  discNumber: 1,
  explicit: true,
  trackArtist: [{ externalId: "6qqNVTkY8uBg9cP3Jd7DAH", artistName: "Billie Eilish" }],
  trackKey: "ididntchangemynumber|6qqNVTkY8uBg9cP3Jd7DAH|158463",
} as const satisfies Track
