import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const billieEilishDontSmileAtMeHostage = {
  id: "01a0b638-ec58-72f4-8e73-8db75ac9eaf1",
  type: "page-type/track",
  slug: "billie-eilish-dont-smile-at-me-hostage",
  ownLength: 3.82375,
  ownProgress: 0,
  partOfCollections: ["release/billie-eilish-dont-smile-at-me"],
  position: 8,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1WsEgieHsWWndAzLkmV105",
      externalLink: "https://open.spotify.com/track/1WsEgieHsWWndAzLkmV105",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "hostage",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6qqNVTkY8uBg9cP3Jd7DAH", artistName: "Billie Eilish" }],
  trackKey: "hostage|6qqNVTkY8uBg9cP3Jd7DAH|229425",
  song: "song/billie-eilish-hostage",
} as const satisfies Track
