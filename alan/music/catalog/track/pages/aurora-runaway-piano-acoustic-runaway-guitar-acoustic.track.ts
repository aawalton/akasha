import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraRunawayPianoAcousticRunawayGuitarAcoustic = {
  id: "01a0b638-05c2-7b78-90e4-fe5683a034e2",
  type: "page-type/track",
  slug: "aurora-runaway-piano-acoustic-runaway-guitar-acoustic",
  ownLength: 4.329983333333334,
  ownProgress: 0,
  partOfCollections: ["release/aurora-runaway-piano-acoustic"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2VkSgNcU9IH45EY3O7Z0lj",
      externalLink: "https://open.spotify.com/track/2VkSgNcU9IH45EY3O7Z0lj",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Runaway - Guitar Acoustic",
  trackType: "acoustic",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "1WgXqy2Dd70QQOU7Ay074N", artistName: "AURORA" }],
  trackKey: "runawayguitaracoustic|1WgXqy2Dd70QQOU7Ay074N|259799",
  song: "song/aurora-runaway",
} as const satisfies Track
