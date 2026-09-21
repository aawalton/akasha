import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const imagineDragonsLoomDontForgetMe = {
  id: "01a0c43f-b540-729d-89a4-1142c5d7e48a",
  type: "page-type/track",
  slug: "imagine-dragons-loom-dont-forget-me",
  ownLength: 2.974666666666667,
  ownProgress: 2.974666666666667,
  partOfCollections: ["release/imagine-dragons-loom"],
  position: 7,
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5SjNA4XCvnggm47yCdNGYe",
      externalLink: "https://open.spotify.com/track/5SjNA4XCvnggm47yCdNGYe",
      lastSyncedAt: "2026-09-21",
    },
  ],
  title: "Don’t Forget Me",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "53XhwfbYqKCa1cC15pYq2q", artistName: "Imagine Dragons" }],
  trackKey: "dontforgetme|53XhwfbYqKCa1cC15pYq2q|178480",
  song: "song/imagine-dragons-don-t-forget-me",
} as const satisfies Track
