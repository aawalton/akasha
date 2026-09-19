import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const billieEilishCopycatSofiTukkerRemixCopycatSofiTukkerRemix = {
  id: "01a0b638-eb1e-734b-8a93-c266bbb9b67a",
  type: "page-type/track",
  slug: "billie-eilish-copycat-sofi-tukker-remix-copycat-sofi-tukker-remix",
  ownLength: 3.3114,
  ownProgress: 0,
  partOfCollections: ["release/billie-eilish-copycat-sofi-tukker-remix"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2njUxZ4151DWIrfIK3loFj",
      externalLink: "https://open.spotify.com/track/2njUxZ4151DWIrfIK3loFj",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "COPYCAT - Sofi Tukker Remix",
  trackType: "remix",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "6qqNVTkY8uBg9cP3Jd7DAH", artistName: "Billie Eilish" },
    { externalId: "586uxXMyD5ObPuzjtrzO1Q", artistName: "SOFI TUKKER" },
  ],
  trackKey: "copycatsofitukkerremix|586uxXMyD5ObPuzjtrzO1Q,6qqNVTkY8uBg9cP3Jd7DAH|198684",
  song: "song/billie-eilish-copycat",
} as const satisfies Track
