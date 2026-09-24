import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraTheGodsWeCanTouchADangerousThing = {
  id: "01a0b637-f563-79d6-8572-7e8e16bb69eb",
  type: "page-type/track",
  slug: "aurora-the-gods-we-can-touch-a-dangerous-thing",
  ownLength: 3.5928833333333334,
  ownProgress: 3.5928833333333334,
  partOfCollections: ["release/aurora-the-gods-we-can-touch"],
  status: "completed",
  unit: "unit/minutes",
  title: "A Dangerous Thing",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/aurora" }],
  trackKey: "adangerousthing|1WgXqy2Dd70QQOU7Ay074N|215573",
  song: "song/aurora-a-dangerous-thing",
  carriedBy: [
    {
      release: "release/aurora-the-gods-we-can-touch",
      discNumber: 1,
      position: 11,
      externalId: "0PDlmmYkuQCUAFhMXvtlsU",
      externalLink: "https://open.spotify.com/track/0PDlmmYkuQCUAFhMXvtlsU",
    },
  ],
} as const satisfies Track
