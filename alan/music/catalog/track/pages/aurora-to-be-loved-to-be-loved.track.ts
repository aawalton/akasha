import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraToBeLovedToBeLoved = {
  id: "01a0b638-0e48-7058-919c-1854d51c15c4",
  type: "page-type/track",
  slug: "aurora-to-be-loved-to-be-loved",
  ownLength: 3.8099,
  ownProgress: 0,
  partOfCollections: ["release/aurora-to-be-loved"],
  position: 3,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1YSvsbCHSwyGKX7wNtV4ld",
      externalLink: "https://open.spotify.com/track/1YSvsbCHSwyGKX7wNtV4ld",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "To Be Loved",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "3NABmtfO8G8s96WFGhbR7F", artistName: "Askjell" },
    { externalId: "1WgXqy2Dd70QQOU7Ay074N", artistName: "AURORA" },
  ],
  trackKey: "tobeloved|1WgXqy2Dd70QQOU7Ay074N,3NABmtfO8G8s96WFGhbR7F|228594",
} as const satisfies Track
