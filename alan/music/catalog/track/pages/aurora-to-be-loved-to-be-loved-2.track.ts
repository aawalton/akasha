import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraToBeLovedToBeLoved2 = {
  id: "01a0b638-0eb9-7d8f-b735-748076da5eb5",
  type: "page-type/track",
  slug: "aurora-to-be-loved-to-be-loved-2",
  ownLength: 3.83105,
  ownProgress: 0,
  partOfCollections: ["release/aurora-to-be-loved"],
  position: 6,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0WWDeAA9aAWjtyYNguc1Pz",
      externalLink: "https://open.spotify.com/track/0WWDeAA9aAWjtyYNguc1Pz",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "To Be Loved",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "3NABmtfO8G8s96WFGhbR7F", artistName: "Askjell" }],
  trackKey: "tobeloved|3NABmtfO8G8s96WFGhbR7F|229863",
  song: "song/aurora-to-be-loved",
} as const satisfies Track
