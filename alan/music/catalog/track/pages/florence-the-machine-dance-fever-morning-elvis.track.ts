import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const florenceTheMachineDanceFeverMorningElvis = {
  id: "01a0a5cd-5c6c-7745-bfa3-cb1e5f6598d2",
  type: "page-type/track",
  slug: "florence-the-machine-dance-fever-morning-elvis",
  ownLength: 4.3666833333333335,
  ownProgress: 0,
  partOfCollections: ["release/florence-the-machine-dance-fever"],
  position: 14,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2HtpqUSxCZ5FnbQ6PTtY4L",
      externalLink: "https://open.spotify.com/track/2HtpqUSxCZ5FnbQ6PTtY4L",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Morning Elvis",
} as const satisfies Track
