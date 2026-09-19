import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraTheRiverAskjellRemixTheRiverAskjellRemix = {
  id: "01a0b638-0f53-712c-9a6f-ba3a97033b81",
  type: "page-type/track",
  slug: "aurora-the-river-askjell-remix-the-river-askjell-remix",
  ownLength: 3.4667,
  ownProgress: 0,
  partOfCollections: ["release/aurora-the-river-askjell-remix"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7mjoN4sysCtuTuQ3e1WTlM",
      externalLink: "https://open.spotify.com/track/7mjoN4sysCtuTuQ3e1WTlM",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "The River - Askjell Remix",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "1WgXqy2Dd70QQOU7Ay074N", artistName: "AURORA" },
    { externalId: "3NABmtfO8G8s96WFGhbR7F", artistName: "Askjell" },
  ],
  trackKey: "theriveraskjellremix|1WgXqy2Dd70QQOU7Ay074N,3NABmtfO8G8s96WFGhbR7F|208002",
  song: "song/aurora-the-river",
} as const satisfies Track
