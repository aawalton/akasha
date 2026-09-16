import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const alexandriaLustLust = {
  id: "01a0aa7a-8a72-775a-896f-b80f82d0c45f",
  type: "page-type/track",
  slug: "alexandria-lust-lust",
  ownLength: 1.9215666666666666,
  ownProgress: 0,
  partOfCollections: ["release/alexandria-lust"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2Tf3o75XkU0IS06tYgEuvn",
      externalLink: "https://open.spotify.com/track/2Tf3o75XkU0IS06tYgEuvn",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Lust",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "3HedFe4b2Nqeg1CEzmt6ZI", artistName: "Marino" },
    { externalId: "0SQG4wPVUlfbmbGQfqB47y", artistName: "Alexandria" },
  ],
  trackKey: "lust|0SQG4wPVUlfbmbGQfqB47y,3HedFe4b2Nqeg1CEzmt6ZI|115294",
} as const satisfies Track
