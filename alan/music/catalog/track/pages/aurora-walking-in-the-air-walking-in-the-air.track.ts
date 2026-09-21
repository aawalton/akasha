import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraWalkingInTheAirWalkingInTheAir = {
  id: "01a0b638-0d95-7ea7-beb4-b8e9c3805c6d",
  type: "page-type/track",
  slug: "aurora-walking-in-the-air-walking-in-the-air",
  ownLength: 3.4842166666666667,
  ownProgress: 3.4842166666666667,
  partOfCollections: ["release/aurora-walking-in-the-air"],
  position: 1,
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1ZWaiAcAc7BTsrTgwTXmnn",
      externalLink: "https://open.spotify.com/track/1ZWaiAcAc7BTsrTgwTXmnn",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Walking In The Air",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "1WgXqy2Dd70QQOU7Ay074N", artistName: "AURORA" }],
  trackKey: "walkingintheair|1WgXqy2Dd70QQOU7Ay074N|209053",
  song: "song/aurora-walking-in-the-air",
  carriedBy: [
    {
      release: "release/aurora-walking-in-the-air",
      discNumber: 1,
      position: 1,
      externalId: "1ZWaiAcAc7BTsrTgwTXmnn",
      externalLink: "https://open.spotify.com/track/1ZWaiAcAc7BTsrTgwTXmnn",
    },
  ],
} as const satisfies Track
