import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraToBeLovedRequiem = {
  id: "01a0b638-0e94-74b4-8681-6d7c326f3963",
  type: "page-type/track",
  slug: "aurora-to-be-loved-requiem",
  ownLength: 6.468183333333333,
  ownProgress: 0,
  partOfCollections: ["release/aurora-to-be-loved"],
  position: 5,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4JT0A22SYMNP1ceiVrCxIc",
      externalLink: "https://open.spotify.com/track/4JT0A22SYMNP1ceiVrCxIc",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Requiem",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "3NABmtfO8G8s96WFGhbR7F", artistName: "Askjell" }],
  trackKey: "requiem|3NABmtfO8G8s96WFGhbR7F|388091",
} as const satisfies Track
