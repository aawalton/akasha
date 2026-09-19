import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const billieEilishDontSmileAtMeBellyache = {
  id: "01a0b638-ec08-7d6e-b9a6-87aa56c3bcb8",
  type: "page-type/track",
  slug: "billie-eilish-dont-smile-at-me-bellyache",
  ownLength: 2.9862,
  ownProgress: 0,
  partOfCollections: ["release/billie-eilish-dont-smile-at-me"],
  position: 6,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1ni8ZTAY1GHXEFOGHl7fdg",
      externalLink: "https://open.spotify.com/track/1ni8ZTAY1GHXEFOGHl7fdg",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "bellyache",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6qqNVTkY8uBg9cP3Jd7DAH", artistName: "Billie Eilish" }],
  trackKey: "bellyache|6qqNVTkY8uBg9cP3Jd7DAH|179172",
  song: "song/billie-eilish-bellyache",
} as const satisfies Track
