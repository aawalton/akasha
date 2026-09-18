import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const billieEilishHappierThanEverLostCause = {
  id: "01a0b638-e47d-7c25-b372-01322e1327f1",
  type: "page-type/track",
  slug: "billie-eilish-happier-than-ever-lost-cause",
  ownLength: 3.5416,
  ownProgress: 0,
  partOfCollections: ["release/billie-eilish-happier-than-ever"],
  position: 7,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4191RXFPa7Ge9XkA4cWlna",
      externalLink: "https://open.spotify.com/track/4191RXFPa7Ge9XkA4cWlna",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Lost Cause",
  discNumber: 1,
  explicit: true,
  trackArtist: [{ externalId: "6qqNVTkY8uBg9cP3Jd7DAH", artistName: "Billie Eilish" }],
  trackKey: "lostcause|6qqNVTkY8uBg9cP3Jd7DAH|212496",
} as const satisfies Track
