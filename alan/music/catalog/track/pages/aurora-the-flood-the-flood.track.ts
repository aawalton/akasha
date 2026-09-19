import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraTheFloodTheFlood = {
  id: "01a0b637-fecf-730d-9aae-ebd703859982",
  type: "page-type/track",
  slug: "aurora-the-flood-the-flood",
  ownLength: 4.495333333333333,
  ownProgress: 0,
  partOfCollections: ["release/aurora-the-flood"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4wwpOIY2XXfYW2A8bS6djJ",
      externalLink: "https://open.spotify.com/track/4wwpOIY2XXfYW2A8bS6djJ",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "The Flood",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "1WgXqy2Dd70QQOU7Ay074N", artistName: "AURORA" }],
  trackKey: "theflood|1WgXqy2Dd70QQOU7Ay074N|269720",
  song: "song/aurora-the-flood",
} as const satisfies Track
