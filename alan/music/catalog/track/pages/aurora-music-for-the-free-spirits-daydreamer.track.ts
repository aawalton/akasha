import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraMusicForTheFreeSpiritsDaydreamer = {
  id: "01a0b638-0942-72ba-9661-7e910339b34b",
  type: "page-type/track",
  slug: "aurora-music-for-the-free-spirits-daydreamer",
  ownLength: 3.65095,
  ownProgress: 0,
  partOfCollections: ["release/aurora-music-for-the-free-spirits"],
  position: 6,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3FsLarRsV6BltfZozdd8Hh",
      externalLink: "https://open.spotify.com/track/3FsLarRsV6BltfZozdd8Hh",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Daydreamer",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "1WgXqy2Dd70QQOU7Ay074N", artistName: "AURORA" }],
  trackKey: "daydreamer|1WgXqy2Dd70QQOU7Ay074N|219057",
  song: "song/aurora-daydreamer",
} as const satisfies Track
