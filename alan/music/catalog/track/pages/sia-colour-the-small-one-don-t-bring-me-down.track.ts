import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const siaColourTheSmallOneDonTBringMeDown = {
  id: "01a0a59c-0f7f-79d1-a28d-13466bb95d3c",
  type: "track",
  slug: "sia-colour-the-small-one-don-t-bring-me-down",
  ownLength: 4.432216666666666,
  ownProgress: 0,
  partOfCollections: ["release/sia-colour-the-small-one"],
  position: 6,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4XSBnZBRdrIQzbIvmysvuC",
      externalLink: "https://open.spotify.com/track/4XSBnZBRdrIQzbIvmysvuC",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Don't Bring Me Down",
} as const satisfies Track
