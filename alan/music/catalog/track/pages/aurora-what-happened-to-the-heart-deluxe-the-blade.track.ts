import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraWhatHappenedToTheHeartDeluxeTheBlade = {
  id: "01a0b637-ed4e-7a2e-bb3b-a68407e0297e",
  type: "page-type/track",
  slug: "aurora-what-happened-to-the-heart-deluxe-the-blade",
  ownLength: 4.55355,
  ownProgress: 0,
  partOfCollections: ["release/aurora-what-happened-to-the-heart-deluxe"],
  position: 14,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3Ogn2lsQoQpGJWUhWDDpDa",
      externalLink: "https://open.spotify.com/track/3Ogn2lsQoQpGJWUhWDDpDa",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "The Blade",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "1WgXqy2Dd70QQOU7Ay074N", artistName: "AURORA" }],
  trackKey: "theblade|1WgXqy2Dd70QQOU7Ay074N|273213",
  song: "song/aurora-the-blade",
} as const satisfies Track
