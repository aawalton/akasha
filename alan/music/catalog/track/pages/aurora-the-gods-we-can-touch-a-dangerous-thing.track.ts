import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraTheGodsWeCanTouchADangerousThing = {
  id: "01a0b637-f563-79d6-8572-7e8e16bb69eb",
  type: "page-type/track",
  slug: "aurora-the-gods-we-can-touch-a-dangerous-thing",
  ownLength: 3.5928833333333334,
  ownProgress: 0,
  partOfCollections: ["release/aurora-the-gods-we-can-touch"],
  position: 11,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0PDlmmYkuQCUAFhMXvtlsU",
      externalLink: "https://open.spotify.com/track/0PDlmmYkuQCUAFhMXvtlsU",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "A Dangerous Thing",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "1WgXqy2Dd70QQOU7Ay074N", artistName: "AURORA" }],
  trackKey: "adangerousthing|1WgXqy2Dd70QQOU7Ay074N|215573",
  song: "song/aurora-a-dangerous-thing",
} as const satisfies Track
