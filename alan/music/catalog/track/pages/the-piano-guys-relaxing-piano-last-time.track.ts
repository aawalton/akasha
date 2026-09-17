import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuysRelaxingPianoLastTime = {
  id: "01a0afa1-cc06-735f-b811-ee610d70cd41",
  type: "page-type/track",
  slug: "the-piano-guys-relaxing-piano-last-time",
  ownLength: 3.1416666666666666,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-relaxing-piano"],
  position: 14,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3Ol3XAEWF4SPi0cmClunad",
      externalLink: "https://open.spotify.com/track/3Ol3XAEWF4SPi0cmClunad",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Last Time",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "lasttime|0jW6R8CVyVohuUJVcuweDI|188500",
} as const satisfies Track
